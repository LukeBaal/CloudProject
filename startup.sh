./hyperledger/startFabric.sh
cd hyperledger/consensus-network
composer network install --card PeerAdmin@hlfv1 --archiveFile consensus-network@0.0.2.bna
composer network start --networkName consensus-network --networkVersion 0.0.2 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer network ping --card admin@consensus-network
composer-rest-server -c admin@consensus-network -n never -a true -u true -w true