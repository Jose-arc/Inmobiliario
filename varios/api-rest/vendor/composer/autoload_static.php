<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit94ce70a3f5187decde56cbcaa62b5c03
{
    public static $prefixesPsr0 = array (
        'S' => 
        array (
            'Slim' => 
            array (
                0 => __DIR__ . '/..' . '/slim/slim',
            ),
        ),
    );

    public static $classMap = array (
        'PiramideUploader' => __DIR__ . '/../..' . '/piramide-uploader/PiramideUploader.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixesPsr0 = ComposerStaticInit94ce70a3f5187decde56cbcaa62b5c03::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit94ce70a3f5187decde56cbcaa62b5c03::$classMap;

        }, null, ClassLoader::class);
    }
}
