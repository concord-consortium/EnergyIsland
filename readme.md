1. Install the Cornerstone SDK and Runtime from https://cornerstone.multitouch.fi/
2. Make sure you can run the Collisions examples located in /opt/cornerstone-[x.y]/bin
3. Place this folder in the /opt/cornerstone-[x.y]/examples/JavaScript folder
4. Create a symbolic link from the data/EnergyIsland folder to Cornerstone's data folder
    cd /opt/cornerstone-2.0.6/data
    sudo ln -s /opt/cornerstone-2.0.6/examples/JavaScript/EnergyIsland/data/EnergyIsland/ EnergyIsland
5. Launch the application from the terminal with
    cd /opt/cornerstone-[x.y]/examples/JavaScript/EnergyIsland
    ./run.sh --console 1111 --background EnergyIsland/map.png
