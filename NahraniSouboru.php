<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nahrání souboru</title>
</head>
<body>

    <h1>Nahrát soubor</h1>
    <form action="" method="post" enctype="multipart/form-data">
        <input type="file" name="fileToUpload" id="fileToUpload">
        <input type="submit" value="Nahrát soubor" name="submit">
    </form>

<?php

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $targetDirectory = "./AZ-Kviz/json/";
        $targetFile = $targetDirectory . basename($_FILES["fileToUpload"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

        // Zkontrolujte, zda byl soubor skutečně odeslán
        if (isset($_POST["submit"])) {
            $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
            if ($check !== false) {
                echo "Soubor je obrázek - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo "Soubor není obrázek.";
                $uploadOk = 0;
            }
        }

        // Zkontrolujte, zda soubor již existuje
        if (file_exists($targetFile)) {
            echo "Omlouváme se, ale soubor již existuje.";
            $uploadOk = 0;
        }

        // Zkontrolujte velikost souboru
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            echo "Omlouváme se, ale soubor je příliš velký.";
            $uploadOk = 0;
        }

        // Povolte určité formáty souborů
        if (
            $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif"
        ) {
            echo "Omlouváme se, ale povoleny jsou pouze JPG, JPEG, PNG a GIF soubory.";
            $uploadOk = 0;
        }

        // Zkontrolujte, zda byla proměnná $ uploadOk nastavena na 0 kvůli chybě
        if ($uploadOk == 0) {
            echo "Omlouváme se, soubor nebyl nahrán.";
        // Všechno je v pořádku, pokuste se nahrát soubor
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {
                echo "Soubor " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " byl úspěšně nahrán.";
            } else {
                echo "Omlouváme se, došlo k chybě při nahrávání souboru.";
            }
        }
    }
?>


    
    
</body>
</html>