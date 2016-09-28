'use strict;'

module.exports = (function() {
    return {
        getErrorMessage: function(errors) {
            var messages = [],
                resultMessage = '';

            _.each(errors, function(error) {
                messages.push(error.text)
            });

            resultMessage = messages.join('<br/>');
            return resultMessage;
        }
    }
}());
