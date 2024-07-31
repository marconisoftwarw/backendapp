sudo yum remove -y nodejs
sudo yum remove -y nodejs
sudo rm -rf /var/cache/yum
sudo rm /etc/yum.repos.d/nodesource*
sudo yum clean all
whereis node
sudo rm -rfv /usr/bin/node /usr/local/bin/node /usr/share/man/man1/node.1.gz
sudo rm -rfv /usr/bin/npm /usr/local/bin/npm /usr/share/man/man1/npm.1.gz
sudo rm -rfv /usr/local/bin/npx
sudo rm -rfv /usr/local/lib/node*
sudo rm -rfv /usr/local/include/node*
sudo rm -rfv /usr/lib/node_modules/
sudo rm -rf /usr/local/bin/npm 
sudo rm -rf /usr/local/share/man/man1/node* 
sudo rm -rf /usr/local/lib/dtrace/node.d 
sudo rm -rf ~/.npm 
sudo rm -rf ~/.node-gyp 
sudo rm -rf /opt/local/bin/node 
sudo rm -rf opt/local/include/node 
sudo rm -rf /opt/local/lib/node_modules  
sudo rm -rf /usr/local/lib/node*
sudo rm -rf /usr/local/include/node*
sudo rm -rf /usr/local/bin/node*
