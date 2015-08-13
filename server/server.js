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
                        console.log('same');
                        return 'no_reason';
                    }
                } else {
                    return 'same';
                    console.log('no_reason');
                }
            } else {
                console.log('reciever_not_found');
                return 'sender_not_found';
            }
        } else {
            console.log('sender_not_found');
            return 'reciever_not_found';
        }
    },
    returnCoins: function(user) {
        var justelecas = Justelecas.find({reciever: user});
        return  jsutelecas;
    },
    returnMe: function(user) {
        var justelecas = Justelecas.find({reciever: user});
        return  justelecas;
    }
})