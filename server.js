const express=require('express');const cors=require('cors');
const {default:makeWASocket,useMultiFileAuthState}=require('@whiskeysockets/baileys');
const app=express();app.use(cors());
app.get('/code',async(req,res)=>{
let num=req.query.number;
if(!num)return res.json({code:'Manca numero'});
let {state,saveCreds}=await useMultiFileAuthState('./auth/'+num);
let sock=makeWASocket({auth:state,printQRInTerminal:false,browser:["Chrome","Chrome","1.0"]});
sock.ev.on('creds.update',saveCreds);
await new Promise(r=>setTimeout(r,3000));
let code=await sock.requestPairingCode(num);
res.json({code});
});
app.listen(3000,()=>console.log('online'));