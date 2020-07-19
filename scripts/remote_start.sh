set -e 

# start back-end
nohup make all &

# start front-end 
cp ~/workspace/.env .
cd ../ui
npm run build
npx serve -s build -l 3000 & 

