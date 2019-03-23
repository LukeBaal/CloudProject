# Start Mongo DB Container
docker run -d --name mongo --network composer_default -p 27017:27017 mongo

# Start Composer rest server
docker run \
  -d \
  -v ~/.composer:/home/composer/.composer \
  --name rest \
  --network composer_default \
  -p 3000:3000 \
  cloud-project/consensus-rest-server


  #   -e COMPOSER_TLS=${COMPOSER_TLS} \
  # -e COMPOSER_TLS_CERTIFICATE=${COMPOSER_TLS_CERTIFICATE} \ 
  # -e COMPOSER_TLS_CERTIFICATE=${COMPOSER_TLS_KEY} \