docker build \
  --build-arg COMPOSER_CARD=${COMPOSER_CARD} \
  --build-arg COMPOSER_NAMESPACES=${COMPOSER_NAMESPACES} \
  --build-arg COMPOSER_AUTHENTICATION=${COMPOSER_AUTHENTICATION} \
  --build-arg COMPOSER_PROVIDERS="${COMPOSER_PROVIDERS}" \
  --build-arg COMPOSER_DATASOURCES="${COMPOSER_DATASOURCES}" \
  -t cloud-project/consensus-rest-server ./hyperledger/consensus-network