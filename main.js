//let currentMileStone = 0
let currentPegPrice =0

  console.log('Roulette contract::',window.roulette)

const approvepls = document.getElementById('approvepls')
const approveusdc = document.getElementById('approveusdc')
approvepls.addEventListener('click',function(){
  getAllowancePLS().then(res=>{
      //if approval is made we can then use the value in the input for deonation amount
      let amountElement = document.getElementById('plsinput');
      let plsamount = amountElement.value
      console.log("pls amount::",plsamount)
      if(plsamount >= 5){
       
        makeContributionPLS(plsamount)
      }else{
        alert("Please provide an amount for the PLS input field")
      }
 
  }).catch(error=>{
      console.log(error)
  })
})

 approveusdc.addEventListener('click',function(){
  getAllowanceUSDC().then(res=>{
      //if approval is made we can then use the value in the input for deonation amount
       //if approval is made we can then use the value in the input for deonation amount
       let amountElement = document.getElementById('usdcinput');
       let usdcamount = amountElement.value
       console.log("pls amount::",usdcamount)
       if(usdcamount >= 5){
        
         makeContributionUSDC(usdcamount)
       }else{
         alert("Please provide an amount for the PLS input field")
       }
  
  }).catch(error=>{
      console.log(error)
  })
})

//};


 
   getCurrentMilestone().then((data)=>{
    //console.log('Milestone details::',data)
     currentMileStone = data
     
     getMilestone(data).then((milestone)=>{
      //console.log('current milestone::', data.plsRaised.toNumber())
      //console.log('target amount::', data.targetAmount.toNumber())
      currentMileStoneData = milestone;
      //currentPegPrice = data.targetAmount.toNumber()
      
      const currentPegPrice = document.getElementById('current_peg_price')
      const contributePlsPegPrice = document.getElementById('contribute_pls_peg_price')
      const contribute_usdc_peg_price = document.getElementById('contribute_usdc_peg_price')
      const toppegprice = document.getElementById('toppegprice')
                currentPegPrice.innerHTML = '$' + ethers.utils.formatUnits(milestone.priceOfPeg,6) 
      contributePlsPegPrice.innerHTML = '$' + ethers.utils.formatUnits(milestone.priceOfPeg,6) 
      contribute_usdc_peg_price.innerHTML = '$' + ethers.utils.formatUnits(milestone.priceOfPeg,6) 
      toppegprice.innerHTML = '$PEG Price ' + ethers.utils.formatUnits(milestone.priceOfPeg,6) 

      const pegPriceContributions = document.getElementById('contributions_peg_price');
      pegPriceContributions.innerHTML = '$'+ ethers.utils.formatUnits(milestone.priceOfPeg,6)

      //populate distribution section

      const pls_distribution = document.getElementById('pls-distribution');
      const usdc_distribution = document.getElementById('usdc-distribution');
      const loading_indicator_pls = document.getElementById('loading-indicator-pls');
      const loading_indicator_usdc = document.getElementById('loading-indicator-usdc');

      //calculate section values
      //25% * max raise in USD per current milestone for PLS per 100,000 PEG
      let pls_dist = parseFloat((25/100)*ethers.utils.formatUnits(milestone.totalUSDCRaised,6)).toFixed(2)
      pls_distribution.innerHTML = '$'+pls_dist+ 'per 100,000 $PEG'

      let USDC_dist = parseFloat((75/100)*ethers.utils.formatUnits(milestone.totalUSDCRaised,6)).toFixed(2)
      usdc_distribution.innerHTML = '$'+USDC_dist+ 'per 300,000 $PEG'


      //setting varibales of section above donate
      const cl = document.getElementById('currentlevel');
      cl.innerHTML = 'Level '+data
      //console.log('current level::',data)
      const levelcontent = document.getElementById('levelcontent');
      levelcontent.innerHTML = '$'+ parseFloat(ethers.utils.formatUnits(milestone.totalUSDCRaised,6)).toFixed(2) +': 25% PLS / 75% USDC'

      const contributionUSDCLevelDiv = document.getElementById('current_usdc_level')
      const contributionPLSLevelDiv = document.getElementById('current_pls_level')

      contributionUSDCLevelDiv.innerHTML = 'USDC Level '+ data
      contributionPLSLevelDiv.innerHTML = 'PLS Level '+ data

      //lets get the user contributions for teh current milestone
      getUsersInMileStone(data).then(outp=>{
        let total_usdc = ethers.utils.parseUnits('0',6);
        let total_pls = ethers.utils.parseUnits('0',18)
        //filter current user
        for(let user in outp){
          
          if(outp[user].user == address){
            //let add the values
            total_pls = total_pls.add(outp[user].plsDonations)
            total_usdc = total_usdc.add(outp[user].usdcDonations)
          }
        }

//add new values to element
    const plscontributed = document.getElementById('pls-contrib') //id is ideal
    plscontributed.innerHTML = parseFloat(ethers.utils.formatUnits(total_pls,18)).toFixed(2) + ' $PLS'
    const usdccontributed = document.getElementById('usdc-contrib') //id is ideal
    usdccontributed.innerHTML = ethers.utils.formatUnits(total_usdc,6) + ' $USDC'

      }).catch(err=>{
        console.log("error get user in milestone:",err)
      })
     


      //generalprogressindicator
      const gpindc = document.getElementById('generalprogressindicator');
      //progressbar width = 300
      let currentcontb = (ethers.utils.formatUnits(milestone.totalUSDCRaised,6))
      let currentpercent = (currentcontb / ethers.utils.formatUnits(milestone.targetAmount,6)) * 100
      console.log("current percent:",currentpercent)
      gpindc.style.width = ((currentpercent/100)*300)+'px';
      //}

      // toppegprice.innerHTML = '$PEG Price $0.5'
      let topnextpegprice = document.getElementById('topnextpegprice');
      topnextpegprice.innerHTML = 'Next Level: '+(ethers.utils.formatUnits(milestone.priceOfPeg.add(ethers.utils.parseUnits('0.10',6)),6))



      //set side wheel
      //get all side wheel ids
      const levels = document.getElementsByClassName('level-wheel');
      //lets loop through and get the active/live level-wheel
    for (let i = 0; i < levels.length; i++) {
        let attr = levels[i].classList
        if(attr.contains('live')){
            levels[i].classList.remove('live')
            levels[i].classList.add('upcoming')

            //remove live from children
            let children = levels[i].getElementsByTagName('div')
            children[0].classList.remove('live')
            children[1].classList.remove('live')
        }

        if(levels[i]?.id === `wheel-${currentMileStone}`){
            levels[i].classList.add('live')
            levels[i].classList.remove('past')

             //add live to children
             let children = levels[i].getElementsByTagName('div')
             children[0].classList.add('live')
             children[1].classList.add('live')
        }
    }


      
     }).catch((err)=>{
         console.log('error: ', err)
     })
     
  }).catch((err)=>{
      console.log('error: ', err)
  })
  
  
  
  
  function getAllMileStones() {
    return new Promise(function(resolve, reject) {
       for (var i = 1; i <= 10; i++) {
      
            getUsersInMileStone(i).then(function(data){
           // console.log('user in milestone::', data)
            if(data != undefined){
                allUsersInMileStone.push(data)
            }
           }).catch((err)=>{
            console.log('error: ', err)
           })
            
           getMilestone(i).then(function(data){
            //console.log('current milestone::', data.plsRaised.toNumber())
            totalTargetAmount += data.targetAmount.toNumber() //! don't use .toNumber(), format with ethers instead to avoid possible overflows with js
            allMileStones.push(data)
           }).catch((err)=>{
            console.log('error: ', err)
           })
        }
      resolve();
    });
  }

  window.onload=()=>{

    let user = null
   getUserDetails().then((response)=>{
    user=response;
    console.log("USER:::::::::::::::::",user)
    if(user){
        const plsContributions = document.getElementById('contributions_pls');
        const usdcContributions = document.getElementById('contributions_usdc');
        const amountContributions = document.getElementById('contributions_amount');
        const pegContributions = document.getElementById('contributions_peg');
   
    
        plsContributions.innerHTML = '$'+ parseFloat(ethers.utils.formatUnits(user.plsDonations,18)).toFixed(2)
        usdcContributions.innerHTML = '$'+ parseFloat(ethers.utils.formatUnits(user.usdcDonations,6)).toFixed(2)
        amountContributions.innerHTML = '$'+ parseFloat(ethers.utils.formatUnits(user.usdcDonations.add(user.usdcOfPlsDonations),6)).toFixed(2)
     
        pegContributions.innerHTML = user?.pegPrice
    }

   }).catch(err=>console.log(err))
   console.log('user details::',user)




    getAllMileStones().then(function() {
      
        setTimeout(function() {
          allUsersInMileStone = allUsersInMileStone.sort((a, b) => b.usdcDonations?.toNumber() - a.usdcDonations?.toNumber())
                 
          console.log('allUsersInMileStone::', allUsersInMileStone)
          console.log('all milestones::', allMileStones)
            
        var milestoneTag = document.createElement("script");
        milestoneTag.src = " https://roulette-static-files.s3.us-west-2.amazonaws.com/milestone.js";
        document.getElementsByTagName("body")[0].appendChild(milestoneTag);
    
    
        var pepesLevelTag = document.createElement("script");
        pepesLevelTag.src = "https://roulette-static-files.s3.us-west-2.amazonaws.com/pepeslevel.js";
        document.getElementsByTagName("body")[0].appendChild(pepesLevelTag);
          
          
          document.getElementById('total_raised_amount').innerHTML = '$' + totalTargetAmount
              }, 3000);
       
      });
  }


  


 // getCurrentPLSMilestone()
