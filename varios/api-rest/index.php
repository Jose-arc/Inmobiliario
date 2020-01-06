<?php

require_once 'vendor/autoload.php';

$app = new \Slim\Slim();

$db = new mysqli('localhost','root','','bt_inmobiliario');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}


$app->get("/account",function() use($app){
    echo "<h1>Inmobiliaria APP</h1>";
});


//INSERTAR OFERENTE
$app->post('/oferente',function() use($app,$db){
    
    $json = $app->request->post('oferente');
    $data = json_decode($json,true);

    if (!isset($data['nombre'])) {
        $data['nombre'] = null;
    }

    if (!isset($data['rut'])) {
        $data['rut'] = null;
    }

    if (!isset($data['direccion'])) {
        $data['direccion'] = null;
    }

    if (!isset($data['email'])) {
        $data['email'] = null;
    }

    if (!isset($data['telefono'])) {
        $data['telefono'] = null;
    }

    if (!isset($data['sitioweb'])) {
        $data['sitioweb'] = null;
    }

    if (!isset($data['idtipo'])) {
        $data['idtipo'] = null;
    }

    if (!isset($data['idoferente'])) {
        $data['idoferente'] = null;
    }

    if (!isset($data['image_oferente'])) {
        $data['image_oferente'] = null;
    }


    $query = "INSERT INTO oferente VALUES(NULL,".
                    "'{$data['nombre']}',".
                    "'{$data['rut']}',".
                    "'{$data['direccion']}',".
                    "'{$data['email']}',".
                    "'{$data['telefono']}',".
                    "'{$data['siteweb']}',".
                    "'{$data['idtipo']}',".
                    "'{$data['idoferente']}',".
                    "'{$data['image_oferente']}');";

    $insert = $db->query($query);
    
    $result = array(
        'status' => 'error',
        'code' => '404',
        'mensaje' => 'no se añadio'
    );

    if($insert){
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => 'se añadio'
        );
    }

    echo json_encode($result);

});


//DEVOLVER A UNA OFERENTE
$app->get('/oferente/:id',function($id) use($db,$app){

    $query = 'CALL get_detalle_oferente('.$id.');';
    $list = $db->query($query);

        if ($list->num_rows == 1) {
            
            $oferente = $list->fetch_assoc();  
            
            $result = array(
                'code' => '200',
                'status' => 'success',
                'data' => $oferente
            );

        }else{
            $result = array(
                'code' => '404',
                'status' => 'error',
                'mensaje' => 'No se encotraron registro'
            );
        }

    echo json_encode($result);

});

//ELIMINAR A UNA OFERENTE

$app->get('/oferente-delete/:id',function($id) use($db,$app){

    $query = 'DELETE FROM oferente WHERE id ='.$id;
    $list = $db->query($query);

        if ($list) {
            $result = array(
                'code' => '200',
                'status' => 'success',
                'mensaje' => 'Se elimino correctamente'
            );

        }else{
            $result = array(
                'code' => '404',
                'status' => 'error',
                'mensaje' => 'Error de eliminacion'
            );
        }

    echo json_encode($result);

});


//LISTAR ALL OFERENTES
$app->get('/oferente',function() use($app,$db){

    $query = "SELECT * FROM oferente;";
    $list = $db->query($query);

    $oferente = array();
    while ($i = $list->fetch_assoc()) {
        $oferente[] = $i;
    }

    if ($oferente != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $oferente
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }


    echo json_encode($result);

});

//UPDATE OFERENTE
$app->post('/oferente-update/:id',function($id) use($app,$db){

    $json = $app->request->post('oferente');
    $data = json_decode($json,true);

    $query = "UPDATE oferente SET ".
            "nombre = '{$data['nombre']}', ".
            "rut = '{$data['rut']}', ".
            "direccion = '{$data['direccion']}', ".
            "email = '{$data['email']}',".
            "telefono = '{$data['telefono']}', ".
            "siteweb = '{$data['siteweb']}', ".
            "idtipo = '{$data['idtipo']}', ".
            "image_oferente = '{$data['image_oferente']}' ".
            "WHERE id = ".$id;
            
            
    
    $list = $db->query($query);

    if ($list) {
        
        $result = array(
            'code' => '200',
            'status' => 'success',
            'mensaje' => 'se modifico correctamente'
        );

    }else {
        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'error al modificar registro'
        );
    }

    echo json_encode($result);   
    //echo $query; 
});

//PROPIEDADES

//INSERTAR PROPIEDADES
$app->post('/propiedades',function() use($app,$db){
    
    $json = $app->request->post('propiedades');
    $data = json_decode($json,true);

    if (!isset($data['idpais'])) {
        $data['idpais'] = null;
    }

    if (!isset($data['ciudad'])) {
        $data['ciudad'] = null;
    }

    if (!isset($data['comuna'])) {
        $data['comuna'] = null;
    }

    if (!isset($data['calleandnumber'])) {
        $data['calleandnumber'] = null;
    }

    if (!isset($data['idformato'])) {
        $data['idformato'] = null;
    }

    if (!isset($data['uf'])) {
        $data['uf'] = null;
    }

    if (!isset($data['monedalocal'])) {
        $data['monedalocal'] = null;
    }

    if (!isset($data['mt2totales'])) {
        $data['mt2totales'] = null;
    }

    if (!isset($data['mt2construidos'])) {
        $data['mt2construidos'] = null;
    }

    if (!isset($data['idpropiedad'])) {
        $data['idpropiedad'] = null;
    }

    if (!isset($data['modelos'])) {
        $data['modelos'] = null;
    }

    if (!isset($data['lat'])) {
        $data['lat'] = null;
    }

    if (!isset($data['lng'])) {
        $data['lng'] = null;
    }

    if (!isset($data['tipoprop'])) {
        $data['tipoprop'] = null;
    }

    if (!isset($data['videos'])) {
        $data['videos'] = null;
    }

    if (!isset($data['galeria'])) {
        $data['galeria'] = null;
    }

    if (!isset($data['equipamiento'])) {
        $data['equipamiento'] = null;
    }

    if (!isset($data['bodega'])) {
        $data['bodega'] = null;
    }

    if (!isset($data['dormitorio'])) {
        $data['dormitorio'] = null;
    }

    if (!isset($data['baños'])) {
        $data['baños'] = null;
    }

    if (!isset($data['corredor'])) {
        $data['corredor'] = null;
    }

    if (!isset($data['identrega'])) {
        $data['identrega'] = null;
    }

    if (!isset($data['financiamiento'])) {
        $data['financiamiento'] = null;
    }

    if (!isset($data['banco'])) {
        $data['banco'] = null;
    }

    if (!isset($data['dividendo'])) {
        $data['dividendo'] = null;
    }

    if (!isset($data['anosplazo'])) {
        $data['anosplazo'] = null;
    }

    if (!isset($data['ispago'])) {
        $data['ispago'] = null;
    }

    if (!isset($data['fecha'])) {
        $data['fecha'] = null;
    }

    if (!isset($data['orden'])) {
        $data['orden'] = null;
    }
    

    $query = "INSERT INTO propiedades VALUES(NULL,".
                    "'{$data['idpais']}',".
                    "'{$data['ciudad']}',".
                    "'{$data['comuna']}',".
                    "'{$data['calleandnumber']}',".
                    "'{$data['idformato']}',".
                    "'{$data['uf']}',".
                    "'{$data['monedalocal']}',".
                    "'{$data['mt2totales']}',".
                    "'{$data['mt2construidos']}',".
                    "'{$data['idpropiedad']}',".
                    "'{$data['modelos']}',".
                    "'{$data['lat']}',".
                    "'{$data['lng']}',".
                    "'{$data['tipoprop']}',".
                    "'{$data['videos']}',".
                    "'{$data['galeria']}',".
                    "'{$data['equipamiento']}',".
                    "'{$data['bodega']}',".
                    "'{$data['dormitorios']}',".
                    "'{$data['banos']}',".
                    "'{$data['corredor']}',".
                    "'{$data['identrega']}',".
                    "'{$data['financiamiento']}',".
                    "'{$data['banco']}',".
                    "'{$data['dividendo']}',".
                    "'{$data['anosplazo']}',".
                    "'{$data['ispago']}',".
                    "'{$data['fecha']}',".
                    "{$data['orden']});";

    $insert = $db->query($query);
    
    $result = array(
        'status' => 'error',
        'code' => '404',
        'mensaje' => 'no se añadio'
    );

    if($insert){
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => 'se añadio'
        );
    }
    //echo $query;
    echo json_encode($result);

});

//DEVOLVER A UNA PROPIEDAD
$app->get('/propiedades/:id',function($id) use($db,$app){

    $query = 'SELECT * FROM propiedades WHERE id ='.$id;
    $list = $db->query($query);

        if ($list->num_rows == 1) {
            
            $propiedades = $list->fetch_assoc();  
            
            $result = array(
                'code' => '200',
                'status' => 'success',
                'data' => $propiedades
            );

        }else{
            $result = array(
                'code' => '404',
                'status' => 'error',
                'mensaje' => 'Error de auntentificacion'
            );
        }

    echo json_encode($result);

});

//ELIMINAR A UNA PROPIEDAD

$app->get('/propiedades-delete/:id',function($id) use($db,$app){

    $query = 'DELETE FROM propiedades WHERE id ='.$id;
    $list = $db->query($query);

        if ($list) {
            $result = array(
                'code' => '200',
                'status' => 'success',
                'data' => 'Se elimino correctamente'
            );

        }else{
            $result = array(
                'code' => '404',
                'status' => 'error',
                'mensaje' => 'Error de eliminacion'
            );
        }

    echo json_encode($result);

});

//LISTAR ALL PROPIEDADES
$app->get('/propiedades',function() use($app,$db){

    $query = "SELECT * FROM propiedades;";
    $list = $db->query($query);

    $propiedades = array();
    while ($i = $list->fetch_assoc()) {
        $propiedades[] = $i;
    }

    if ($propiedades != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $propiedades
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }


    echo json_encode($result);

});

//UPDATE PROPIEDADES
$app->post('/propiedades-update/:id',function($id) use($app,$db){

    $json = $app->request->post('propiedades');
    $data = json_decode($json,true);

    $query = "UPDATE propiedades SET ".
            "idpais = '{$data['idpais']}', ".
            "ciudad ='{$data['ciudad']}', ".
            "comuna = '{$data['comuna']}', ".
            "calleandnumber = '{$data['calleandnumber']}', ".
            "idformato = '{$data['idformato']}', ".
            "uf = '{$data['uf']}', ".
            "monedalocal = '{$data['monedalocal']}', ".
            "mt2totales = '{$data['mt2totales']}', ".
            "mt2construidos = '{$data['mt2construidos']}', ".
            "modelos = '{$data['modelos']}', ".
            "lat = '{$data['lat']}', ".
            "lng = '{$data['lng']}', ".
            "tipoprop = '{$data['tipoprop']}', ".
            "videos = '{$data['videos']}', ".
            "galeria = '{$data['galeria']}', ".
            "equipamiento = '{$data['equipamiento']}', ".
            "bodega = '{$data['bodega']}', ".
            "dormitorios = '{$data['dormitorios']}', ".
            "banos = '{$data['banos']}', ".
            "corredor = '{$data['corredor']}', ".
            "identrega = '{$data['identrega']}', ".
            "financiamiento = '{$data['financiamiento']}', ".
            "banco = '{$data['banco']}', ".
            "dividendo = '{$data['dividendo']}', ".
            "anosplazo = '{$data['anosplazo']}', ".
            "ispago = '{$data['ispago']}', ".
            "fecha = '{$data['fecha']}', ".
            "anosplazo = '{$data['anosplazo']}'  ".
            "WHERE id = {$id} ";
            
            
    
    $list = $db->query($query);

    if ($list) {
        
        $result = array(
            'code' => '200',
            'status' => 'success',
            'mensaje' => 'se modifico correctamente'
        );

    }else {
        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'error al modificar registro'
        );
    }

    echo json_encode($result);    
});

//PROYECTOS

//INSERTAR PROYECTOS
$app->post('/proyectos',function() use($app,$db){
    
    $json = $app->request->post('proyectos');
    $data = json_decode($json,true);

    if (!isset($data['idproyecto'])) {
        $data['idproyecto'] = null;
    }

    if (!isset($data['nombre'])) {
        $data['nombre'] = null;
    }

    if (!isset($data['imagen'])) {
        $data['imagen'] = null;
    }

    if (!isset($data['body'])) {
        $data['body'] = null;
    }

    if (!isset($data['direccionproyecto'])) {
        $data['direccionproyecto'] = null;
    }


    $query = "INSERT INTO proyectos VALUES(NULL,".
                    "'{$data['idproyecto']}',".
                    "'{$data['nombre']}',".
                    "'{$data['imagen']}',".
                    "'{$data['body']}',".
                    "'{$data['direccionproyecto']}');";

    $insert = $db->query($query);
    
    $result = array(
        'status' => 'error',
        'code' => '404',
        'mensaje' => 'no se añadio'
    );

    if($insert){
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => 'se añadio'
        );
    }

    echo json_encode($result);

});

//DEVOLVER A UN PROYECTO
$app->get('/proyectos/:id',function($id) use($db,$app){

    $query = 'SELECT * FROM proyectos WHERE id ='.$id;
    $list = $db->query($query);

        if ($list->num_rows == 1) {
            
            $proyectos = $list->fetch_assoc();  
            
            $result = array(
                'code' => '200',
                'status' => 'success',
                'data' => $proyectos
            );

        }else{
            $result = array(
                'code' => '404',
                'status' => 'error',
                'mensaje' => 'Error de auntentificacion'
            );
        }

    echo json_encode($result);

});

//ELIMINAR A UNA PROYECTOS

$app->get('/proyectos-delete/:id',function($id) use($db,$app){

    $query = 'DELETE FROM proyectos WHERE id ='.$id;
    $list = $db->query($query);

        if ($list) {
            $result = array(
                'code' => '200',
                'status' => 'success',
                'data' => 'Se elimino correctamente'
            );

        }else{
            $result = array(
                'code' => '404',
                'status' => 'error',
                'mensaje' => 'Error de eliminacion'
            );
        }

    echo json_encode($result);

});

//LISTAR ALL PROYECTOS
$app->get('/proyectos',function() use($app,$db){

    $query = "SELECT * FROM proyectos;";
    $list = $db->query($query);

    $proyectos = array();
    while ($i = $list->fetch_assoc()) {
        $proyectos[] = $i;
    }

    if ($proyectos != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $proyectos
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }


    echo json_encode($result);

});

//NEWSLETTER

//INSERTAR NEWSLETTER
$app->post('/noticias',function() use($app,$db){
    
    $json = $app->request->post('noticias');
    $data = json_decode($json,true);

    if (!isset($data['idnoticias'])) {
        $data['idnoticias'] = null;
    }

    if (!isset($data['titulo'])) {
        $data['titulo'] = null;
    }

    if (!isset($data['imagen'])) {
        $data['imagen'] = null;
    }

    if (!isset($data['body'])) {
        $data['body'] = null;
    }

    if (!isset($data['fecha'])) {
        $data['fecha'] = null;
    }

    if (!isset($data['by'])) {
        $data['by'] = null;
    }

    if (!isset($data['fullfecha'])) {
        $data['fullfecha'] = null;
    }

    if (!isset($data['categoria'])) {
        $data['categoria'] = null;
    }


    $query = "INSERT INTO noticias VALUES(NULL,".
                    "'{$data['idnoticias']}',".
                    "'{$data['titulo']}',".
                    "'{$data['imagen']}',".
                    "'{$data['body']}',".
                    "'{$data['fecha']}',".
                    "'{$data['by']}',".
                    "'{$data['fullfecha']}',".
                    "'{$data['categoria']}');";

    $insert = $db->query($query);
    
    $result = array(
        'status' => 'error',
        'code' => '404',
        'mensaje' => 'no se añadio'
    );

    if($insert){
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => 'se añadio'
        );
    }

    echo json_encode($result);
    //echo $query;
});

//DEVOLVER A UNA NEWSLETTER
$app->get('/noticias/:id',function($id) use($db,$app){

    $query = 'SELECT * FROM noticias WHERE id ='.$id;
    $list = $db->query($query);

        if ($list->num_rows == 1) {
            
            $noticia = $list->fetch_assoc();  
            
            $result = array(
                'code' => '200',
                'status' => 'success',
                'data' => $noticia
            );

        }else{
            $result = array(
                'code' => '404',
                'status' => 'error',
                'mensaje' => 'Error de auntentificacion'
            );
        }

    echo json_encode($result);

});

//ALTERNATIVA DEVOLVER A UN NEWSLETTER
$app->get('/noticias/:id',function($idnoticia) use($db,$app){

    $query = 'SELECT * FROM noticias WHERE idnoticias ='.$idnoticia;
    $list = $db->query($query);

        if ($list->num_rows == 1) {
            
            $noticiaAlt = $list->fetch_assoc();  
            
            $result = array(
                'code' => '200',
                'status' => 'success',
                'data' => $noticiaAlt
            );

        }else{
            $result = array(
                'code' => '404',
                'status' => 'error',
                'mensaje' => 'Error no se encontro ninguna noticia'
            );
        }

    echo json_encode($result);

});

//ELIMINAR A UNA NEWSLETTER

$app->get('/noticias-delete/:id',function($id) use($db,$app){

    $query = 'DELETE FROM noticias WHERE id ='.$id;
    $list = $db->query($query);

        if ($list) {
            $result = array(
                'code' => '200',
                'status' => 'success',
                'data' => 'Se elimino correctamente'
            );

        }else{
            $result = array(
                'code' => '404',
                'status' => 'error',
                'mensaje' => 'Error de eliminacion'
            );
        }

    echo json_encode($result);

});


//LISTAR ALL NEWSLETTER
$app->get('/noticias',function() use($app,$db){

    $query = "SELECT * FROM noticias";
    $list = $db->query($query);

    $noticia = array();
    while ($i = $list->fetch_assoc()) {
        $noticia[] = $i;
    }

    if ($noticia != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $noticia
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }


    echo json_encode($result);

});

//UPDATE NEWSLETTER
$app->post('/noticias-update/:id',function($id) use($app,$db){
    $json = $app->request->post('noticias');
    $data = json_decode($json,true);

    $query = "UPDATE noticias SET ".
            "titulo = '{$data['titulo']}', ".
            "imagen = '{$data['imagen']}', ".
            "body = '{$data['body']}', ".
            "fecha = '{$data['fecha']}', ".
            "by = '{$data['by']}', ".
            "fullfecha = '{$data['fullfecha']}', ".
            "categoria = '{$data['categoria']}' ".
            "WHERE id = {$id}";
            
            
    
    $list = $db->query($query);

    if ($list) {
        
        $result = array(
            'code' => '202',
            'status' => 'success',
            'mensaje' => 'se modifico correctamente'
        );

    }else {
        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'error al modificar registro'
        );
    }

    //echo $query;
    echo json_encode($result);    
});


//PAISES



//DEVOLVER A UNA PAIS
$app->get('/pais/:id',function($id) use($db,$app){

    $query = 'SELECT * FROM pais WHERE id ='.$id;
    $list = $db->query($query);

        if ($list->num_rows == 1) {
            
            $pais = $list->fetch_assoc();  
            
            $result = array(
                'code' => '200',
                'status' => 'success',
                'data' => $pais
            );

        }else{
            $result = array(
                'code' => '404',
                'status' => 'error',
                'mensaje' => 'Error de auntentificacion'
            );
        }

    echo json_encode($result);

});


//FILE BD
//INSERTAR NAME IN BD TABLE
$app->post('/banco',function() use($app,$db){
    
    $json = $app->request->post('banco');
    $data = json_decode($json,true);

    if (!isset($data['nombre'])) {
        $data['nombre'] = null;
    }


    $query = "INSERT INTO banco VALUES(NULL,".
                    "'{$data['nombre']}');";

    $insert = $db->query($query);
    
    $result = array(
        'status' => 'error',
        'code' => '404',
        'mensaje' => 'no se añadio'
    );

    if($insert){
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => 'se añadio'
        );
    }

    echo json_encode($result);

});

//Listar todas las rutas
$app->get('/banco',function() use($app,$db){

    $query = "SELECT * FROM vista_banco";
    $list = $db->query($query);

    $banco = array();
    while ($i = $list->fetch_assoc()) {
        $banco[] = $i;
    }

    if ($banco != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $banco
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }


    echo json_encode($result);

});

//Probar Stored Procedure
$app->get('/categorianoticia/:id',function($id) use($db,$app){

    $query = 'CALL get_categoria_noticia('.$id.')';
    $list = $db->query($query);

    $categoria = array();
    while ($i = $list->fetch_assoc()) {
        $categoria[] = $i;
    }

    if ($categoria != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $categoria
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }

    echo json_encode($result);

});

$app->get('/categoriaoferente/:id',function($id) use($db,$app){

    $query = 'CALL get_categoria_oferente('.$id.')';
    $list = $db->query($query);

    $categoria = array();
    while ($i = $list->fetch_assoc()) {
        $categoria[] = $i;
    }

    if ($categoria != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $categoria
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }

    echo json_encode($result);

});






//subir Fichero al servidor
$app->post('/upload',function() use($db,$app){

    $result = array(
        'status' => 'error',
        'code' => '404',
        'mensaje' => 'error al subir el fichero'
    );

    if (isset($_FILES['uploads'])) {
        
        $piramideUpload = new PiramideUploader();
        
        $subida = $piramideUpload->upload('image',"uploads","img-uploads",array("image/jpg","image/png","image/jpeg","image/gif"));
        $file = $piramideUpload->getInfoFile();
        $nom_img = $file['complete_name'];

        // var_dump($file);
        if (isset($subida) && $subida["uploaded"] == false) {
            
            $result = array(
                'status' => 'error',
                'code' => '404',
                'mensaje' => 'error no se pudo subir el fichero'
            );

        }else {
            $result = array(
                'status' => 'success',
                'code' => '200',
                'mensaje' => 'se subio correctamente',
                'nomimagen' => $nom_img
            );
        }
    }

    echo json_encode($result);  

});

//LISTAR TIPO
$app->get('/tipo',function() use($app,$db){

    $query = "SELECT * FROM vista_tipo;";
    $list = $db->query($query);

    $tipo = array();
    while ($i = $list->fetch_assoc()) {
        $tipo[] = $i;
    }

    if ($tipo != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $tipo
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }


    echo json_encode($result);

});
//END

//LISTA TIPOPROPIEDAD
$app->get('/tipopropiedad',function() use($app,$db){

    $query = "SELECT * FROM vista_tipopropiedad;";
    $list = $db->query($query);

    $tipo = array();
    while ($i = $list->fetch_assoc()) {
        $tipo[] = $i;
    }

    if ($tipo != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $tipo
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }


    echo json_encode($result);

});
//END

//LISTAR FORMATO
$app->get('/formato',function() use($app,$db){

    $query = "SELECT * FROM vista_formato;";
    $list = $db->query($query);

    $tipo = array();
    while ($i = $list->fetch_assoc()) {
        $tipo[] = $i;
    }

    if ($tipo != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $tipo
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }


    echo json_encode($result);

});
//END

//Listar cantidad total de propiedades
$app->get('/npropiedades',function() use($app,$db){

    $query = "SELECT * FROM vista_ordenprop";
    $list = $db->query($query);

    $npropiedades = array();
    while ($i = $list->fetch_assoc()) {
        $npropiedades[] = $i;
    }

    if ($npropiedades != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $npropiedades
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }


    echo json_encode($result);

});

//LISTAR TIPO ENTREGA
$app->get('/entrega',function() use($app,$db){

    $query = "SELECT * FROM vista_entrega;";
    $list = $db->query($query);

    $tipo = array();
    while ($i = $list->fetch_assoc()) {
        $tipo[] = $i;
    }

    if ($tipo != null) {
        
        $result = array(
            'status' => 'success',
            'code' => '200',
            'mensaje' => $tipo
        );

    }else{

        $result = array(
            'code' => '404',
            'status' => 'error',
            'mensaje' => 'No hay registros'
        );

    }


    echo json_encode($result);

});
//END


$app->run(); //ejecuta todo los metodos insertos en este PHP
