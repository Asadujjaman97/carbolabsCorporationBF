<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $company = htmlspecialchars($_POST['company']);
    $pdfFile = htmlspecialchars($_POST['pdfFile']);

    $to = "info@carbolabs.com.bd";
    $subject = "New Data Sheet Request: $pdfFile";
    $message = "Name: $name\nEmail: $email\nPhone: $phone\nCompany: $company\nRequested File: $pdfFile";
    $headers = "From: no-reply@carbolabs.com.bd";

    if(mail($to, $subject, $message, $headers)) {
        echo "<script>
          alert('Thank you, $name! Your request has been sent.');
          window.open('$pdfFile', '_blank');
          window.location.href = 'basic-raw-materials.html';
        </script>";
    } else {
        echo "<script>alert('Error sending message. Please try again.'); history.back();</script>";
    }
}
?>
