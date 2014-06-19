<?php
    $name    = $_REQUEST['name'];
    $email   = $_REQUEST['email'];
    $message = $_REQUEST['message'];
    $budget  = $_REQUEST['budget'];

    if (($name=="")||($email=="")||($message=="")) {
      echo "All fields except budget are required, please fill <a href=\"\">the form</a> again.";
    }

    else {
      $from    = "From: $name<$email>\r\nReturn-path: $email";
      $subject = "Possible lead";
      $message = $message . "\n Budget: " . $budget; 
      mail("info@simplebitdesign.com", $subject, $message, $from);
      header( 'Location: http://simplebitdesign.com/thankyou.html' );
    }

?>
