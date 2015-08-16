Meteor.methods({
    addCoin: function(sender, reciever, reason) {
        if (Meteor.users.findOne({'emails.address': reciever})) {
            if (Meteor.users.findOne({'emails.address': sender})) {
                if (reciever != sender) {
                    if (reason) {
                        var justeleca = {
                            sender: sender,
                            reciever: reciever,
                            reason: reason,
                            timestamp: new Date
                        }
                        console.log(justeleca);
                        Justelecas.insert(justeleca);
                        return 'added';
                    } else {
                        console.log('no_reason');
                        throw new Meteor.Error(500, 'no_reason');
                    }
                } else {
                    throw new Meteor.Error(500, 'same');
                    console.log('same');
                }
            } else {
                console.log('sender_not_found');
                throw new Meteor.Error(500, 'sender_not_found');
            }
        } else {
            console.log('reciever_not_found');
            throw new Meteor.Error(500, 'reciever_not_found');
        }
    }
})