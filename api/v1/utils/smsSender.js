const sendLevelUpdateMsg = (user, level ) => {
	console.log(`Dear ${user.name}, Congratulations! Your earnings level has been increased to ${level.name}, with a commission of Ksh.${level.savings} for every Ksh 100 spent`);
}

const sendCommissionPaidMsg = (user, amountPaid) => {
	console.log(`Dear ${user.name} your earned commission of Ksh.${amountPaid} has been deposited in your account.`)
}

const sendCommissionEarnedMsg = (user, amount) => {
	console.log(`Dear ${user.name} you have earned a commission of Ksh.${amount}. Your total balance is ${user.commissionDue} `)
}

module.exports = { 
	sendLevelUpdateMsg,
	sendCommissionPaidMsg,
	sendCommissionEarnedMsg
}