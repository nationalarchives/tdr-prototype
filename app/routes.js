const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
// Run this code when a form is submitted to 'juggling-balls-answer'
router.get('/metadata/closure-metadata/T2-flour/confirm-closure-status', function (req, res) {

    // file[] is open/undefined && data[] is open/undefined ( intention is to continue without confirmation - needs error warning )
    if(req.session.data['cocao'] === undefined ) {
        console.log("send to /check-closure-status?error=no-confirmation")
        req.session.data['error'] = 'no-confirmation';
        res.redirect('/metadata/closure-metadata/T2-flour/check-closure-status')
        
    } else if( req.session.data['cocao'][0] === 'true'){
        req.session.data['error'] = '';
        res.redirect('/metadata/closure-metadata/T2-flour/add-closure')
    } else if( req.session.data['cocao'] === 'false'){
        req.session.data['error'] = '';
        res.redirect('/metadata/closure-metadata/file-level')
    } else {
        // req.session.files['cocao'] = undefined;
        res.redirect('/metadata/closure-metadata/T2-flour/huh')
    }
  
  })
module.exports = router
