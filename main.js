//let currentMileStone = 0
let currentPegPrice = 0

  console.log('Roulette contract::',window.roulette)
  const CONSENT_API_URL = 'https://4c7ygocnf1.execute-api.us-west-2.amazonaws.com/consent-function';

function getConsent(){
  //fetch consent data to confirm if to show modal or not
  

  const params = {
      "useraddress":`${address}`,
      "write":false
  };
  const options = {
    method: 'POST',
    body: JSON.stringify( params )  
  };
  fetch( CONSENT_API_URL, options )
    .then( response => response.json() )
    .then( response => {
      //console.log('LSSSSSSSSSSSSSSSSSS:',response)
        if(response?.length){
          //do nothing user already consented
        }else{
          //show modal
          const consentmodal = document.getElementById('consent_modal');
          consentmodal.style.display = 'block'
        }
  } );
}

//function to log and close consent modal
function saveConsent(){
  const params = {
    "useraddress":`${address}`,
    "write":true
  };
  const options = {
    method: 'POST',
    body: JSON.stringify( params )  
  };
  fetch( CONSENT_API_URL, options )
    .then( response => response.json() )
    .then( response => {
        if(response.status === 'success'){
          const consentmodal = document.getElementById('consent_modal');
          consentmodal.style.display = 'none'
        }
  } );

}

const consent_form = document.getElementById('email-form');
consent_form.addEventListener('submit',(e)=>{
  e.preventDefault()
  saveConsent()
})


const approvepls = document.getElementById('approvepls')
const approveusdc = document.getElementById('approveusdc')
const donatepls = document.getElementById("pls_error")
const donateusdc = document.getElementById("usdc_error")
let plsamountElement = document.getElementById('plsinput');
let usdcamountElement = document.getElementById('usdcinput');

const pls_max = document.getElementById("pls_max");
const usdc_max = document.getElementById("usdc_max");

pls_max.addEventListener("click",function(){
  //get max pls balance and fill in donate input
  getPLSBalance().then(response=>{
    plsamountElement.value = ethers.utils.formatUnits(response,18)
  })

})

usdc_max.addEventListener("click",function(){
  //get max usdc balance and fill in donate input
  getUSDCBalance().then(response=>{
    usdcamountElement.value = ethers.utils.formatUnits(response,6)
  })

})

approvepls.addEventListener('click', function () {
  //update status to processing 
  donatepls.style.display = 'block';
  donatepls.style.color = 'yellow';
  donatepls.innerHTML = "Prosessing your transaction ..."
  getAllowancePLS().then(res => {
    //if approval is made we can then use the value in the input for deonation amount
    
    let plsamount = plsamountElement.value
    console.log("pls amount::", plsamount)
    if (plsamount >= 5) {

      makeContributionPLS(plsamount).then(respon=>{
      
        donatepls.innerHTML = "Thank you!. \n Your donation has been recieved successfully!"
        donatepls.style.color = 'green';
        //lets reload page
        setTimeout(()=>{
          location.reload()
        },2000)
      
      }).catch(error=>{
       
        donatepls.innerHTML = "Sorry!. \n There was an error processing your donation at this time!"
        donatepls.style.color = 'red';
        setTimeout(()=>{
          location.reload()
        },2000)
      })
    } else {
      alert("Please provide an amount for the PLS input field")
    }

  }).catch(error => {
    console.log(error)
  })
})

approveusdc.addEventListener('click', function () {
  donateusdc.style.display = 'block';
  donateusdc.style.color = 'yellow';
  donateusdc.innerHTML = "Prosessing your donation ..."
  getAllowanceUSDC().then(res => {
    //if approval is made we can then use the value in the input for deonation amount
    //if approval is made we can then use the value in the input for deonation amount
   
    let usdcamount = usdcamountElement.value
    console.log("pls amount::", usdcamount)
    if (usdcamount >= 5) {

      makeContributionUSDC(usdcamount).then(respon=>{

        donateusdc.innerHTML = "Thank you!. \n Your donation has been recieved successfully!"
        donateusdc.style.color = 'green';
        //lets reload page
        setTimeout(()=>{
          location.reload()
        },2000)
      }).catch(error=>{
        donateusdc.style.color = 'red';
        donateusdc.innerHTML = "Sorry!. \n There was an error processing your donation at this time!"
        setTimeout(()=>{
          location.reload()
        },2000)
      })
    } else {
      alert("Please provide an amount for the PLS input field")
    }

  }).catch(error => {
    console.log(error)
  })
})

//};



getCurrentMilestone().then((data) => {
  // console.log('Milestone details::',data)
  currentMileStone = data

  getMilestone(data).then((milestone) => {
    //console.log('current milestone::', data.plsRaised.toNumber())
    //console.log('target amount::', data.targetAmount.toNumber())
    currentMileStoneData = milestone;
    //currentPegPrice = data.targetAmount.toNumber()

    const currentPegPrice = document.getElementById('current_peg_price')
    const contributePlsPegPrice = document.getElementById('contribute_pls_peg_price')
    const contribute_usdc_peg_price = document.getElementById('contribute_usdc_peg_price')
    const toppegprice = document.getElementById('toppegprice')
    currentPegPrice.innerHTML = '$' + ethers.utils.formatUnits(milestone.priceOfPeg, 6).toLocaleString()
    contributePlsPegPrice.innerHTML = '$' + ethers.utils.formatUnits(milestone.priceOfPeg, 6).toLocaleString()
    contribute_usdc_peg_price.innerHTML = '$' + ethers.utils.formatUnits(milestone.priceOfPeg, 6).toLocaleString()
    toppegprice.innerHTML = '$PEG Price ' + ethers.utils.formatUnits(milestone.priceOfPeg, 6).toLocaleString()

    const pegPriceContributions = document.getElementById('contributions_peg_price');
    pegPriceContributions.innerHTML = '$' + ethers.utils.formatUnits(milestone.priceOfPeg, 6).toLocaleString()

    //populate distribution section

    // const pls_distribution = document.getElementById('pls-distribution');
    // const usdc_distribution = document.getElementById('usdc-distribution');
    // const loading_indicator_pls = document.getElementById('loading-indicator-pls');
    // const loading_indicator_usdc = document.getElementById('loading-indicator-usdc');

    //calculate section values
    //25% * max raise in USD per current milestone for PLS per 100,000 PEG
    // let pls_dist = parseFloat((25 / 100) * ethers.utils.formatUnits(milestone.totalUSDCRaised, 6)).toFixed(2)
    // pls_distribution.innerHTML = '$' + pls_dist + 'per 100,000 $PEG'

    // let USDC_dist = parseFloat((75 / 100) * ethers.utils.formatUnits(milestone.totalUSDCRaised, 6)).toFixed(2)
    // usdc_distribution.innerHTML = '$' + USDC_dist + 'per 300,000 $PEG'


    //setting varibales of section above donate
    const cl = document.getElementById('currentlevel');
    cl.innerHTML = 'Level ' + data
    //console.log('current level::',data)
    const levelcontent = document.getElementById('levelcontent');
    //console.log('THISS: ', parseFloat(ethers.utils.formatUnits(milestone.totalUSDCRaised, 6)).toFixed(2))
    levelcontent.innerHTML = '$' + parseFloat(ethers.utils.formatUnits(milestone.totalUSDCRaised, 6)).toFixed(2) + ' : 25% PLS / 75% USDC'

    //removed from UI
    // const contributionUSDCLevelDiv = document.getElementById('current_usdc_level')
    // const contributionPLSLevelDiv = document.getElementById('current_pls_level')

    // contributionUSDCLevelDiv.innerHTML = 'USDC Level ' + data
    // contributionPLSLevelDiv.innerHTML = 'PLS Level ' + data

    //lets get the user contributions for teh current milestone
    ///just call get user details.
    console.log('data: ', data)
    getUserDetails().then(user => {
      let userUsdcDonations = ethers.utils.parseUnits('0', 6);
      let userPlsDonations = ethers.utils.parseUnits('0', 18)
      let userUsdcOfPlsDonations = ethers.utils.parseUnits('0', 6)
      console.log('user: ', user)
      //filter current user
      // for(let user of user){
      console.log('user: ', user)
      console.log('user.user: ', user.user)
      console.log('global address: ', address)
      if (user.user.toLowerCase() === address.toLowerCase()) {

        userPlsDonations = userPlsDonations.add(user.plsDonations)
        userUsdcDonations = userUsdcDonations.add(user.usdcDonations)
        userUsdcOfPlsDonations = userUsdcOfPlsDonations.add(user.usdcOfPlsDonations)
      }
      // }

      const usdcOfPlsContributed = document.getElementById('contributions_usdc_of_pls')
      usdcOfPlsContributed.innerHTML = parseFloat(ethers.utils.formatUnits(userUsdcOfPlsDonations, 6)).toFixed(2)

      const numOfPlsTokensContributed = document.getElementById('contribution_pls')
      numOfPlsTokensContributed.innerHTML = parseFloat(ethers.utils.formatUnits(userPlsDonations, 18)).toFixed(2) + ' PLS'

      const usdcContributed = document.getElementById('contributions_usdc')
      usdcContributed.innerHTML = '$' + parseFloat(ethers.utils.formatUnits(userUsdcDonations, 6)).toFixed(2)

      const numberOfUsdcContributed = document.getElementById('contribution_usdc_number')
      numberOfUsdcContributed.innerHTML = parseFloat(ethers.utils.formatUnits(userUsdcDonations, 6)).toFixed(2) + ' USDC'

      const totalUserContributions = document.getElementById('contributions_total_amount')
      totalUserContributions.innerHTML = '$' + ethers.utils.formatUnits(userUsdcDonations.add(userUsdcOfPlsDonations), 6)



    }).catch(err => {
      console.log("error get user in milestone:", err)
    })



    //generalprogressindicator
    const gpindc = document.getElementById('generalprogressindicator');
    //progressbar width = 300
    let currentcontb = (ethers.utils.formatUnits(milestone.totalUSDCRaised, 6))
    let currentpercent = (currentcontb / ethers.utils.formatUnits(milestone.targetAmount, 6)) * 100
    console.log("current percent:", currentpercent)
    gpindc.style.width = ((currentpercent / 100) * 300) + 'px';
    
    //lets move the rocket as well
    document.getElementById('progress-rocket').style.left = (((currentpercent / 100) * 300) - 15) + '%'


    // toppegprice.innerHTML = '$PEG Price $0.5'
    let topnextpegprice = document.getElementById('topnextpegprice');
    topnextpegprice.innerHTML = 'Next Level: ' + (ethers.utils.formatUnits(milestone.priceOfPeg.add(ethers.utils.parseUnits('0.10', 6)), 6))



    //set side wheel
    //get all side wheel ids
    const levels = document.getElementsByClassName('level-wheel');
    //lets loop through and get the active/live level-wheel
    for (let i = 0; i < levels.length; i++) {
      let attr = levels[i].classList
      if (attr.contains('live')) {
        levels[i].classList.remove('live')
        levels[i].classList.add('upcoming')

        //remove live from children
        let children = levels[i].getElementsByTagName('div')
        children[0].classList.remove('live')
        children[1].classList.remove('live')
      }

      if (levels[i]?.id === `wheel-${currentMileStone}`) {
        levels[i].classList.add('live')
        levels[i].classList.remove('past')

        //add live to children
        let children = levels[i].getElementsByTagName('div')
        children[0].classList.add('live')
        children[1].classList.add('live')
      }
    }



  }).catch((err) => {
    console.log('error: ', err)
  })

}).catch((err) => {
  console.log('error: ', err)
})




function getAllMileStones() {
  return new Promise(function (resolve, reject) {

    for (var i = 1; i <= 10; i++) {

      getUsersInMileStone(i).then(function (data) {
        // console.log('user in milestone::', data)
        if (data != undefined) {
          allUsersInMileStone.push(data)
        }
      }).catch((err) => {
        console.log('error: ', err)
      })

      getMilestone(i).then(function (data) {
        //console.log('current milestone::', data.plsRaised.toNumber())
        totalTargetAmount += parseFloat(ethers.utils.formatUnits(data.targetAmount, 6)) //! don't use .toNumber(), format with ethers instead to avoid possible overflows with js
        allMileStones.push(data)
      }).catch((err) => {
        console.log('error: ', err)
      })
    }
    resolve();
  });
}

window.onload = () => {
  getUSDCBalance().then(response=>{
    console.log("USDC:",response)
    document.getElementById('usdc_balance').innerHTML ='Balance: ' + ethers.utils.formatUnits(response,6)
})


getPLSBalance().then(response=>{
  document.getElementById('pls_balance').innerHTML ='Balance: ' + ethers.utils.formatUnits(response,18)
})

  getConsent()
  let user = null
  getUserDetails().then((response) => {
    user = response;
    //console.log("USER:::::::::::::::::",user)
    if (user) {
      const plsContributions = document.getElementById('contributions_pls');
      const usdcContributions = document.getElementById('contributions_usdc');
      const amountContributions = document.getElementById('contributions_amount');
      const pegContributions = document.getElementById('contributions_peg');


      plsContributions.innerHTML = '$' + parseFloat(ethers.utils.formatUnits(user.plsDonations, 18)).toFixed(2)
      usdcContributions.innerHTML = '$' + parseFloat(ethers.utils.formatUnits(user.usdcDonations, 6)).toFixed(2)
      amountContributions.innerHTML = '$' + parseFloat(ethers.utils.formatUnits(user.usdcDonations.add(user.usdcOfPlsDonations), 6)).toFixed(2)

      pegContributions.innerHTML = user?.pegPrice
    }

  }).catch(err => console.log(err))
  //console.log('user details::',user)

  getCurrentMilestoneDetails().then((resp) => {
    document.getElementById('current_peg_price').innerHTML = '$' + ethers.utils.formatUnits(resp.priceOfPeg, 6)

    const FDV = parseFloat(ethers.utils.formatUnits(resp.priceOfPeg, 6)) * 20e6
    document.getElementById('fdv-id').innerHTML = '$' + FDV.toLocaleString()

    const circMktCap = FDV * (0.298 - (10 - resp.milestoneId) * 0.02)

    document.getElementById('circ-mkt-cap').innerHTML = '$' + circMktCap.toLocaleString()
    console.log('total raised: ', ethers.utils.formatUnits(resp.totalUSDCRaised, 6))
    document.getElementById('total_raised_amount').innerHTML = '$' + ethers.utils.formatUnits(resp.totalUSDCRaised, 6)

  })


  getAllMileStones().then(function () {

    setTimeout(function () {
      allUsersInMileStone = allUsersInMileStone.sort((a, b) => b.usdcDonations?.toNumber() - a.usdcDonations?.toNumber())

      // console.log('allUsersInMileStone::', allUsersInMileStone)
      // console.log('all milestones::', allMileStones)

      var milestoneTag = document.createElement("script");
      milestoneTag.src = " https://roulette-static-files.s3.us-west-2.amazonaws.com/milestone.js";
      document.getElementsByTagName("body")[0].appendChild(milestoneTag);


      var pepesLevelTag = document.createElement("script");
      pepesLevelTag.src = "https://roulette-static-files.s3.us-west-2.amazonaws.com/pepeslevel.js";
      document.getElementsByTagName("body")[0].appendChild(pepesLevelTag);



    }, 3000);
  });
}





 // getCurrentPLSMilestone()
