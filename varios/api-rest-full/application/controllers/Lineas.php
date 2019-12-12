<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php');
use Restserver\libraries\REST_Controller;

class Lineas extends REST_Controller {

    
    public function __construct(){


        //permite servicios rest de distinto origenes de datos o diferentes lugares sin restriccion
        header("Access-Control-Allow-Methods: PUT");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Origin: *");
        //END

        //permite inicializar la base de datos
        parent::__construct();
        $this->load->database();
        //END
    }

    //Query SELECT * FROM a una tabla y pasarlo a array
    public function index_GET(){

        $query = $this->db->query('SELECT * FROM lineas');

        $respuesta = array(
            'error' => FALSE,
            'lineas' => $query->result_array()
        );

        $this->response($respuesta);

    }
    //END
}