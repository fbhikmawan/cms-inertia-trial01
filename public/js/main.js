function contentUpdate(contentFrom, contentBase) {
    // Your jQuery code here
    Livewire.emit('contentFrom', contentFrom)
    Livewire.emit('contentBase', contentBase)
}

function liveWireHook() {
    // Livewire lifecycle hooks
    // Livewire.hook('component.initialized', (component) => {
    //     console.log('LW Hook component.initialized: ', component)
    // })
    // Livewire.hook('element.initialized', (el, component) => {
    //     console.log('LW Hook element.initialized: ')
    //     console.log(el)
    //     console.log(component)
    // })
    // Livewire.hook('element.updating', (fromEl, toEl, component) => {
    //     console.log('LW Hook element.updating: ')
    // })
    // Livewire.hook('element.updated', (el, component) => {
    //     console.log('LW Hook element.updated: ')
    // })
    // Livewire.hook('element.removed', (el, component) => {
    //     console.log('LW Hook element.removed: ')
    // })
    Livewire.hook('message.sent', (message, component) => {
        console.log('LW Hook message.sent: ', message, component)
    })
    Livewire.hook('message.failed', (message, component) => {
        console.log('LW Hook message.failed: ', message, component)
    })
    Livewire.hook('message.received', (message, component) => {
        console.log('LW Hook message.received: ', message, component)
    })
    Livewire.hook('message.processed', (message, component) => {
        console.log('LW Hook message.processed: ', message, component)
    })
}

// Execute codes as soon as the DOM is fully loaded and ready to be manipulated.
// This method is called immediately after the HTML document is loaded,
// but before all images and other resources have finished downloading.
// Wawan-KNDI
$(function() {
    // BS Collapse List
    const collapseList = $.map($('.collapse'), function(collapseEl) {
        return new bootstrap.Collapse(collapseEl)
    });
    let temp;

    // Livewire event Listeners
    Livewire.on('contentBase', contentName => {
        console.log('LW emit contentBase: ', contentName)
    })
    Livewire.on('contentFrom', contentFrom => {
        console.log('LW emit contentFrom: ', contentFrom)

        // sidebarDashboards selection from Collapse List
        temp = collapseList.filter(function(collapse) {
            return $(collapse._element).attr('id') === contentFrom
        });
        const contentFromInstance = $(temp[0]._element);
        console.log('contentFromInstance: ', contentFromInstance);

        // add class active to the parent
        contentFromInstance.parent().addClass('menuitem-active')

        // sidebarDashboards event listeners
        contentFromInstance.on('hide.bs.collapse', function(event) {
            console.log(contentFrom + ' hide event');
        });
        contentFromInstance.on('hidden.bs.collapse', function(event) {
            console.log(contentFrom + ' hidden event');
        });
        contentFromInstance.on('show.bs.collapse', function(event) {
            console.log(contentFrom + ' show event');
        });
        contentFromInstance.on('shown.bs.collapse', function(event) {
            console.log(contentFrom + ' shown event');
        });
    })

    // Livewire Hook
    liveWireHook()
})
