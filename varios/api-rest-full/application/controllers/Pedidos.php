<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php');
use Restserver\libraries\REST_Controller;

class Pedidos extends REST_Controller {

    
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

    public function realizar_orden_POST($token = 0, $id_usuario = 0){

        $data = $this->post(); //obtiene los datos enviado por post

        if ($token == "0" || $id_usuario == "0") {
            
            $respuesta = array(
                'error' => TRUE,
                'mensaje' => 'Token invalido y/o usuario invalido'
            );

            $this->response($respuesta,REST_Controller::HTTP_BAD_REQUEST);
            return;
        }

        if ( !isset( $data["items"] ) || strlen( $data['items'] ) == 0) {
            
            $respuesta = array(
                'error' => TRUE,
                'mensaje' => 'Faltan los items en el post'
            );

            $this->response($respuesta,REST_Controller::HTTP_BAD_REQUEST);
            return;

        }

        //PASAR VALIDADORES DE ITEMS,USUARIO,TOKEN
        $condiciones = array('id' => $id_usuario, 'token' => $token);
        $this->db->where( $condiciones );

        $query = $this->db->get('login'); //esta linea se dirige a la tabla donde quiero hacer la $condicion de mas arriba

        $existe = $query->row(); // me trae el resultado de la query (la fila completa)

        if (!$existe) {
            
            $respuesta = array(
                'error' => TRUE,
                'mensaje' => 'Usuario y Token incorrectos'
            );

            $this->response($respuesta);
            return;

        }

        //USUARIO y TOKEN son correctos
        $this->db->reset_query();

        $insertar = array('usuario_id' => $id_usuario);
        $this->db->insert('ordenes',$insertar );
        $orden_id = $this->db->insert_id();

        //crear el detalle de la orden

        $this->db->reset_query();
        $items = explode(',',$data['items']); //SPLIT de los productos

        foreach ($items as &$productos_id) {
            
            $datos_insertar = array('producto_id'=>$productos_id, 'orden_id'=>$orden_id);
            $this->db->insert('ordenes_detalle' , $datos_insertar);
        }

        $respuesta = array(
            'error' => FALSE,
            'orden_id' => $orden_id
        );

        $this->response($respuesta);

    }

    public function obtener_pedido_GET($token = "0" ,$id_usuario = "0"){

        if ($token == "0" || $id_usuario == "0") {
            
            $respuesta = array(
                'error' => TRUE,
                'mensaje' => 'Token invalido y/o usuario invalido'
            );

            $this->response($respuesta,REST_Controller::HTTP_BAD_REQUEST);
            return;
        }

        //PASAR VALIDADORES DE ITEMS,USUARIO,TOKEN
        $condiciones = array('id' => $id_usuario, 'token' => $token);
        $this->db->where( $condiciones );

        $query = $this->db->get('login'); //esta linea se dirige a la tabla donde quiero hacer la $condicion de mas arriba

        $existe = $query->row(); // me trae el resultado de la query (la fila completa)

        if (!$existe) {
            
            $respuesta = array(
                'error' => TRUE,
                'mensaje' => 'Usuario y Token incorrectos'
            );

            $this->response($respuesta);
            return;

        }

        //Retornar las ordenes de los usuarios
        $query = $this->db->query("SELECT * FROM ordenes WHERE usuario_id = ".$id_usuario." ");

        // if ($query->result_array() == null) {
            
        //     $respuesta = array('error' => TRUE,
        //                         'mensaje'=>'ERROR');
                                
        //     $this->response($respuesta,REST_Controller::HTTP_BAD_REQUEST);
        // }        
        // else{
            
        //     $respuesta = array(
        //         'error' => FALSE,
        //         'producto' => $query->result_array()
        //     );

        //         $this->response($respuesta);
        //     }

        $ordenes = array();

        foreach ($query->result() as $row) {
            
            $query_detalle = $this->db->query("SELECT * FROM ordenes_detalle o INNER JOIN productos b ON o.producto_id = b.codigo WHERE orden_id = ".$row->id." ");

            $orden = array(
                'id' => $row->id , 
                'creado_en' => $row->creado_en,
                'detalle' => $query_detalle->result()
            );

            array_push($ordenes, $orden);
        }

        $respuesta = array(
                    'error' => FALSE,
                    'producto' => $ordenes
                );
    
        $this->response($respuesta);
                

    }

    //METODO PARA BORRAR 

    public function borrar_pedido_DELETE( $token = "0", $id_usuario = "0", $orden_id = "0"){

        if ($token == "0" || $id_usuario == "0" || $orden_id == "0") {
            
            $respuesta = array(
                'error' => TRUE,
                'mensaje' => 'Token invalido y/o usuario invalido'
            );

            $this->response($respuesta,REST_Controller::HTTP_BAD_REQUEST);
            return;
        }

        //PASAR VALIDADORES DE ITEMS,USUARIO,TOKEN
        $condiciones = array('id' => $id_usuario, 'token' => $token);
        $this->db->where( $condiciones );

        $query = $this->db->get('login'); //esta linea se dirige a la tabla donde quiero hacer la $condicion de mas arriba

        $existe = $query->row(); // me trae el resultado de la query (la fila completa)

        if (!$existe) {
            
            $respuesta = array(
                'error' => TRUE,
                'mensaje' => 'Usuario y Token incorrectos'
            );

            $this->response($respuesta);
            return;

        }

        //verificar si la orden es de ese usuario

        $this->db->reset_query();
        $condiciones = array('id' => $orden_id, 'usuario_id'=>$id_usuario);
        $this->db->where($condiciones);

        $query = $this->db->get('ordenes');
        $existe = $query->row();

        if ( !$existe ) {

            $respuesta = array(
                'error' => TRUE,
                'mensaje' => 'Esa orden no puede ser borrada'
            );

            $this->response($respuesta);
            return;
        }

        $condiciones = array( 'id' => $orden_id );
        $this->db->delete('ordenes',$condiciones);

        $condiciones = array( 'orden_id' => $orden_id );
        $this->db->delete('ordenes_detalle',$condiciones);

        $respuesta = array('error' => FALSE, 
                            'mensaje' => 'Orden Eliminada');

        $this->response($respuesta);

    }
}