<template>
  
</template>

<script>
  import ScatterJS from 'scatterjs-core';
  import ScatterEOS from 'scatterjs-plugin-eosjs';
  import Eos from "eosjs"
  ScatterJS.plugins(new ScatterEOS());

  export default {
    name: 'Scatter',
    data: function () {
      return {}
    },
    methods: {
      pay: function(){
        const network = {
          blockchain:'eos',
          protocol:'https',
          host:'mainnet.meet.one',
          port:443,
          chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
        }
        ScatterJS.scatter.connect("wkex").then(connected => {
          // User does not have Scatter Desktop, Mobile or Classic installed.
          if(!connected){
            console.log("no found scatter");
            return false;
          }

          const scatter = ScatterJS.scatter;
          console.log(scatter);
          const requiredFields = { accounts:[network] };
          scatter.getIdentity(requiredFields).then(() => {   //登录

            // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
            // the user for their account name beforehand. They could still give you a different account.
            const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
            console.log(account);
            // You can pass in any additional options you want into the eosjs reference.
            const eosOptions = { expireInSeconds:60 };

            // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
            const eos = scatter.eos(network, Eos, eosOptions);

            // ----------------------------
            // Now that we have an identity,
            // an EOSIO account, and a reference
            // to an eosjs object we can send a transaction.
            // ----------------------------


            // Never assume the account's permission/authority. Always take it from the returned account.
            const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
            eos.transfer(account.name, 'gqytqmbug4ge', '0.0001 EOS', 'for test', transactionOptions).then(trx => {
              // That's it!
              console.log(`Transaction ID: ${trx.transaction_id}`);
            }).catch(error => {
              console.error(error);
            });

          }).catch(error => {
            // The user rejected this request, or doesn't have the appropriate requirements.
            console.error(error);
          });
        });
      },
    },
    mounted: function () {
      this.pay();
    },
  }
</script>

<style scoped>

</style>