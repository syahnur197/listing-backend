const sharp = require("sharp");
const AWS = require("aws-sdk");
const { config_aws } = require("../../../config/config");
const { v4 } = require("uuid");

const maxAge = 365 * 24 * 60 * 60; // 1 year

const s3 = new AWS.S3({
  accessKeyId: config_aws.accessKeyId,
  secretAccessKey: config_aws.secretAccessKey,
  region: config_aws.region,
});

const uploadFile = (fileName, fileBuffer, contentType) =>
  s3
    .upload({
      Bucket: config_aws.s3Bucket,
      Key: fileName,
      Body: fileBuffer,
      CacheControl: `max-age=${maxAge}`,
      ContentType: contentType,
    })
    .promise();

const generateUploadedImagesMetaData = (model_type, model_id, files) => {
  return files.map((file) => {
    const fileName = v4();
    return {
      filePath: `${model_type}/${model_id}/${fileName}`,
      mimetype: "image/webp",
      extension: "webp",
    };
  });
};

const resizeAndUpload = (fileBuffer, filePath, fileSizes) => {
  fileSizes.map(async (fileSize) => {
    await sharp(fileBuffer)
      .resize({
        width: fileSize,
        height: fileSize,
        fit: "cover",
        position: sharp.strategy.entropy,
      })
      .webp({ quality: 50, lossless: false }) // compression ftw!!!
      .toBuffer()
      .then((resized) =>
        uploadFile(filePath + `/${fileSize}.webp`, resized, "image/webp")
      );
  });
};

module.exports = async (req, res, next) => {
  // stop executing if no files to be found
  // though unlikely to happen since I have validated the request body
  if (!req.files) {
    next();
    return;
  }

  const images = [];

  const model_type = req.model_type;
  const model_id = req.model_id;

  // generate uploadedImages detail to be used to update the file paths for the model
  const uploadedImages = generateUploadedImagesMetaData(
    model_type,
    model_id,
    req.files
  );

  // pass the file paths to the request body to update the model files data
  // is used to check if file is successfully uploaded
  req.uploadedImages = uploadedImages;

  const resizePromises = req.files.map(async (file, index) => {
    const filePath = uploadedImages[index].filePath;
    const fileSizes = [2000, 750, 500, 300, 100];

    resizeAndUpload(file.buffer, filePath, fileSizes);

    images.push(filePath);
  });

  // I don't use await here so that the user doesn't have to wait for the upload to complete
  Promise.all([...resizePromises]);

  next();
};
