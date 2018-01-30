sudo yum update

sudo yum install ruby
sudo yum install wget

cd /home/ec2-user
wget https://aws-codedeploy-us-west-1.s3.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto

curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs

sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
sudo yum install yarn
