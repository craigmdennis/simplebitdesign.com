<?php
    $name    = $_REQUEST['name'];
    $email   = $_REQUEST['email'];
    $message = $_REQUEST['message'];

    if (($name=="")||($email=="")||($message=="")) {
      echo "All fields are required, please fill <a href=\"\">the form</a> again.";
    }

    else {
      $from    = "From: $name<$email>\r\nReturn-path: $email";
      $subject = "Possible lead";
      mail("info@simplebitdesign.com", $subject, $message, $from);
      header( 'Location: http://dev.simplebitdesign.com/thankyou.html' );
    }

?>
