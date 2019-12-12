<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php');
use Restserver\libraries\REST_Controller;

class Productos extends REST_Controller {

    //permite inicializar la base de datos
    public function __construct(){


        //permite servicios rest de distinto origenes de datos o diferentes lugares sin restriccion
        header("Access-Control-Allow-Methods: PUT, GET");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Origin: *");
        //END

        parent::__construct();
        $this->load->database();

    }
    //END

    //
    public function todos_GET( $pagina = 0){

        $pagina = $pagina * 10;

        $query = $this->db->query('SELECT * FROM productos limit '.$pagina.',10 ');

        $respuesta = array(
            'error' => FALSE,
            'productos' => $query->result_array()
        );

        $this->response($respuesta);

    }
    //END

    //buscar por id categoria y limite de pagina
    public function por_tipo_GET($tipo = 0, $pagina = 0){

        $pagina = $pagina * 10;

        $query = $this->db->query('SELECT * FROM productos where linea_id = '.$tipo.' limit '.$pagina.',10 ');

        //$retVal = ($query->result_array() == null) ? $respuesta = array('error' => TRUE,'mensaje' => 'No se encontraron productos') : $respuesta = array('error' => FALSE,'productos' => $query->result_array()); ;
        //$this->response($retVal);

        if ($tipo == 0) {
            
            $respuesta = array(
                'error' => TRUE,
                'mensaje' => 'Falta el parametro de la categoria'
            );

            $this->response($respuesta,REST_Controller::HTTP_BAD_REQUEST);
            return;
        }
        else{
            $respuesta = array(
                'error' => FALSE,
                'productos' => $query->result_array()
            );
            
            $this->response($respuesta);
        }

    }
    //END

    //Buscar producto
    public function buscar_GET($search){
        
        $query = $this->db->query("SELECT * FROM productos 
                                    WHERE producto LIKE '%".$search."%' ");

        if ($query->result_array() == null) {
            
            $respuesta = array('error' => TRUE,
                                'keywords' => $search, 
                                'mensaje'=>'No se encontro el producto');
                                
            $this->response($respuesta,REST_Controller::HTTP_BAD_REQUEST);
        }        
        else{
            
            $respuesta = array(
                'error' => FALSE,
                'producto' => $query->result_array()
            );

                $this->response($respuesta);
            }
    }
//END
}