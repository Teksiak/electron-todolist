const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('Notification', {
    showDialog: (type, title, message) => {
        ipcRenderer.invoke('SHOW_DIALOG', {
            title, 
            type,
            message
        })
    }
})