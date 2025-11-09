<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    $to = "info@carbolabs.com.bd";
    $headers = "From: Carbolabs Website <no-reply@carbolabs.com.bd>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $body = "
        <h2>New Contact Message from Carbolabs Website</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong><br>$message</p>
    ";

    if (mail($to, "Contact Form: $subject", $body, $headers)) {
        echo "<script>alert('Thank you! Your message has been sent successfully.'); window.history.back();</script>";
    } else {
        echo "<script>alert('Error sending message. Please try again later.'); window.history.back();</script>";
    }
}
?>
