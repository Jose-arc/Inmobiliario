<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php');
use Restserver\libraries\REST_Controller;

class Login extends REST_Controller {

    
    public function __construct(){


        //permite servicios rest de distinto origenes de datos o diferentes lugares sin restriccion
        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Origin: *");
        //END

        //permite inicializar la base de datos
        parent::__construct();
        $this->load->database();
        //END
    }

    //index sive para ejecutar una sola function al ingresar a login//

    //cuando es un post no recibimos parametro eso quere decir que la function index_POST(){...} debe ir vacia//
    public function index_POST(){

        $data = $this->post(); //esta tomando los valores enviador por post

        if ( !isset( $data['correo']) OR !isset( $data['contrasena']) ) {
            
            $respuesta = array(
                'error' => TRUE,
                'mensaje' => '!!Error la info enviada no es valida');

            $this->response($respuesta,REST_Controller::HTTP_BAD_REQUEST);
            return;
        }

        //Dos forma de validar
        //OPC 1
            $condiciones = array('correo' => $data['correo'], 
                                 'contrasena' => $data['contrasena'] );
            $query = $this->db->get_where('login',$condiciones);
            $usuario = $query->row(); //-> esta es el resultado de la query para obtener user.

            if (!isset($usuario)) {
                $respuesta = array('error' => TRUE,
                                    'mensaje' => 'Usuario o contraseña incorrecta' );

            $this->response($respuesta);
            return;
            }
        //END
        //OPC 2 hacer una query normal como la de las de productos

        //-----PASO EL LOGIN-------//
        
        //GENERAR TOKEN//
        $token = bin2hex( openssl_random_pseudo_bytes(20)); //->token aleatoreo siempre que pase el login
        $token = hash('ripemd160',$data['correo']); 

        //Guardar token en BD
        
        $this->db->reset_query(); //limpiar memoria de querys

        $actualizar_token = array('token'=> $token);

        $this->db->where( 'id', $usuario->id);
        
        $hecho = $this->db->update('login',$actualizar_token);

        $respuesta = array('error' => FALSE, 'token' => $token, 'id_user' =>$usuario->id);

        $this->response($respuesta);

    }
}