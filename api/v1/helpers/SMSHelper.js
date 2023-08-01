const sendLevelUpdateMsg = (user, level ) => {
	console.log(`Dear ${user.name}, Congratulations! Your earnings level has been increased to ${level.name}, with ${level.savings} points earned for every Ksh 100 spent`);
}

const sendCommissionPaidMsg = (user, amountPaid) => {
	console.log(`Dear ${user.name} you redeemed ${amountPaid} loyalty points. Your new loyalty points balance is ${user.commissionDue}`)
}

const sendCommissionEarnedMsg = (user, amount) => {
	console.log(`Dear ${user.name} you have earned ${amount} loyalty points. Your total loyalty points balance is ${user.commissionDue} `)
}

module.exports = { 
	sendLevelUpdateMsg,
	sendCommissionPaidMsg,
	sendCommissionEarnedMsg
}