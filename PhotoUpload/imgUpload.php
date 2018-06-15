
<?php
  include('./header.php');
	$targetDir = "uploads/";
	$conn=mysqli_connect("localhost","root","","op");
	$response = array();
	
	
		$l= count($_POST['images']);
		
	for($i=0;$i<$l;$i++){
		$uuid = uniqid('', true);
		$find=',';
		$img = explode(',', $_POST['images'][$i]['src']);
		$ini =substr($img[0], 11);
		$type = explode(';', $ini);
		$r=strstr($_POST['images'][$i]['src'],$find,true);
		$b64_image = substr($_POST['images'][$i]['src'], strpos($_POST['images'][$i]['src'], ',') + 1);
		$res = str_replace(' ', '+', $b64_image); 
  
		echo "<br/>".$imageup=file_put_contents("./uploads/".$uuid.".".$type[0],base64_decode($res));
		try{
          $stmt = $conn->prepare("INSERT  into opdetails (image)values(?)");
          $stmt->bind_param("s", $uuid);
          if($stmt->execute()){
            $response['error'] = false;
            $response['message'] = 'File uploaded successfully';
          }else{
            throw new Exception("Could not upload file");
          }
        }catch(Exception $e){
          $response['error'] = true;
          $response['message'] = 'Could not upload file';
        }
	}
	
	
 
	
	
 
		
 
  
  

   echo json_encode($response);
?>
