button.addEventListener('pointerup', function (event) {
    navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
        .then(device => {
            // Human-readable name of the device.
            console.log(device.name);

            // Attempts to connect to remote GATT Server.
            return device.gatt.connect();
        })
        .then(server => { // Getting Battery Service...
            return server.getPrimaryService('battery_service');
        })
        .then(service => {
            // Getting Battery Level Characteristic...
            return service.getCharacteristic('battery_level');
        })
        .then(characteristic => {
            // Reading Battery Level...
            return characteristic.readValue();
        })
        .then(value => {
            console.log('Battery percentage is ' + value.getUint8(0));
        })
        .catch(error => { console.log(error); });
});