// This file will not end up inside the main application JavaScript bundle.
// Instead, it will simply be copied inside the build folder.
// The generated "index.html" will require it just before this main bundle.
// You can thus use it to define some environment variables that will
// be made available synchronously in all your JS modules under "src".
//
// Warning: this file will not be transpiled by Babel and cannot contain
// any syntax that is not yet supported by your targeted browsers.

window.EQUIPMENT_SERVICE_URL = 'https://localhost:5001'
window.EQUIPMENT_ITEMS_API_URL = `${window.EQUIPMENT_SERVICE_URL}/equipment`
window.EQUIPMENTINVENTORY_SERVICE_URL = 'https://localhost:5005'
window.EQUIPMENTINVENTORY_ITEMS_API_URL = `${window.EQUIPMENTINVENTORY_SERVICE_URL}/equipmentInventory`
window.IDENTITY_SERVICE_URL = 'https://localhost:5003'
window.USERS_API_URL = `${window.IDENTITY_SERVICE_URL}/users`
window.RABBITMQ_URL = 'http://localhost:15672'