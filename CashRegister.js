'use strict';

const totalValueObj= moneyList => {
  let total= 0;

  Object.keys(moneyList).map(key => {
    total+= moneyList[key];
  });

  return total;
};

const totalValue= moneyList => {
  let total= 0;
  moneyList.map(aMoneyType => {
    total+= aMoneyType[1];
  });

  return total;
};

const returnCash= (balance, cid) => {
  const cidObj= {};
  let saveBalance= balance;

  let insufficient= false;

  cid.map(moneyType => {
    cidObj[moneyType[0]]= moneyType[1];
  });

  let moneyObj= {
    "ONE HUNDRED": 0,
    "TWENTY": 0, 
    "TEN": 0, 
    "FIVE": 0,
    "ONE": 0,  
    "QUARTER": 0,
    "DIME": 0, 
    "NICKEL": 0, 
    "PENNY": 0
  };

  while (saveBalance > 0) {
    if (saveBalance >= 100 && cidObj.hasOwnProperty('ONE HUNDRED') && moneyObj['ONE HUNDRED'] < cidObj['ONE HUNDRED'] && cidObj['ONE HUNDRED'] !== 0) {
      saveBalance-= 100;
      moneyObj['ONE HUNDRED']+= 100;
    }
    else if (saveBalance >= 20 && cidObj.hasOwnProperty('TWENTY') && moneyObj['TWENTY'] < cidObj['TWENTY'] && cidObj['TWENTY'] !== 0) {
      saveBalance-= 20;
      moneyObj['TWENTY']+= 20;
    }
    else if (saveBalance >= 10 && cidObj.hasOwnProperty('TEN') && moneyObj['TEN'] < cidObj['TEN'] && cidObj['TEN'] !== 0) {
      saveBalance-= 10;
      moneyObj['TEN']+= 10;
    }
    else if (saveBalance >= 5 && cidObj.hasOwnProperty('FIVE') && moneyObj['FIVE'] < cidObj['FIVE'] && cidObj['FIVE'] !== 0) {
      saveBalance-= 5;
      moneyObj['FIVE']+= 5;
    }
    else if (saveBalance >= 1 && cidObj.hasOwnProperty('ONE') && moneyObj['ONE'] < cidObj['ONE'] && cidObj['ONE'] !== 0) {
      saveBalance-= 1;
      moneyObj['ONE']+= 1;
    }
    else if (saveBalance >= 0.25 && cidObj.hasOwnProperty('QUARTER') && moneyObj['QUARTER'] < cidObj['QUARTER'] && cidObj['QUARTER'] !== 0) {
      saveBalance= (saveBalance - 0.25).toFixed(2);
      moneyObj['QUARTER']+= 0.25;
    }
    else if (saveBalance >= 0.1 && cidObj.hasOwnProperty('DIME') && moneyObj['DIME'] < cidObj['DIME'] && cidObj['DIME'] !== 0) {
      saveBalance= (saveBalance - 0.1).toFixed(2);
      moneyObj['DIME']+= 0.1;
    }
    else if (saveBalance >= 0.05 && cidObj.hasOwnProperty('NICKEL') && moneyObj['NICKEL'] < cidObj['NICKEL'] && cidObj['NICKEL'] !== 0) {
      saveBalance= (saveBalance - 0.05).toFixed(2);
      moneyObj['NICKEL']+= 0.05;
    }
    else if (saveBalance >= 0.01 && cidObj.hasOwnProperty('PENNY') && moneyObj['PENNY'] < cidObj['PENNY'] && cidObj['PENNY'] !== 0) {
      saveBalance= (saveBalance - 0.01).toFixed(2);
      moneyObj['PENNY']+= 0.01;
    }
    else {
      insufficient= true;
      console.log('saveBalance= ' + saveBalance);
      console.log('moneyObj= ' + totalValueObj(moneyObj));
      break;
    }
  }

  if (insufficient) {
    console.log('insufficient!');
    return null;
  }
  
  let returnCast= [];
  Object.keys(moneyObj).map(aMoneyType => {
    if (moneyObj[aMoneyType] > 0) returnCast.push([aMoneyType , moneyObj[aMoneyType]]);
  });

  return returnCast;
};

function checkCashRegister(price, cash, cid) {
  let balance= cash - price;
  let status= ''
  let change= [];

  if (balance == 0 || balance == totalValue(cid))  {
    status= 'CLOSED';
    change= cid.slice();
  }

  else if (balance > 0) {
    change= returnCash(balance, cid);

    if (!change) {
      status= 'INSUFFICIENT_FUNDS';
      change= [];
    }
    else status= 'OPEN';
  }

  // Here is your change, ma'am.
  return {'status': status, 'change': change};
}


console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

/* should return {status: "OPEN", change: [["TWENTY", 60], 
["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
*/