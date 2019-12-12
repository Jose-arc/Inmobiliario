<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php');
use Restserver\libraries\REST_Controller;

class Prueba extends REST_Controller {

    //permite inicializar la base de datos
    public function __construct(){


        //permite servicios rest de distinto origenes de datos o diferentes lugares sin restriccion
        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Origin: *");
        //END

        parent::__construct();
        $this->load->database();

    }
    //END

    public function index(){
        echo "Hola Mundo";
    }

    

    public function Obtener_arreglo_GET($index = 0){
        
        if ($index > 2) {
            $respuesta = array('error' => TRUE, 'mensaje'=>'No existe elemento'.$index);
            $this->response($respuesta,REST_Controller::HTTP_BAD_REQUEST);
        }
        else{

        $arreglo = array("manzana","pera","piña");
        $respuesta = array('error' => FALSE, 'fruta'=>$arreglo[$index]);
        
        $this->response($respuesta);

        //echo json_encode($arreglo[$index]);
        }
    }

    public function obtener_producto_GET($codigo){
        //$this->load->database(); //llamar a la BD desde la misma funcion
        $query = $this->db->query("SELECT producto, proveedor FROM productos WHERE codigo ='".$codigo."'  ");
            //echo json_encode($query->result());
        
            $this->response( $query->result());

    }

    public function all_pais_GET(){
        //$this->load->database(); //llamar a la BD desde la misma funcion
        $query = $this->db->query("SELECT * FROM pais");
            //echo json_encode($query->result());
        
        $respuesta = array(
            'error' => FALSE,
            'paises' => $query->result_array()
        );
    
        $this->response($respuesta);


        //$this->response( $query->result());

    }

    public function all_state_GET($id){
        $query = $this->db->query("SELECT * FROM pais p INNER JOIN estado e ON p.id = e.ubicacionpaisid WHERE p.id =".$id." ");
            //echo json_encode($query->result());
            $respuesta = array(
                'error' => FALSE,
                'paises' => $query->result_array()
            );

            $this->response($respuesta);
            
            //$this->response( $query->result());
    }

}
