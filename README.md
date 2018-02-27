signingConfigs {
            //调试版的keystore
            debug {
                storeFile = ("/Users/yangnengkang/workSpace/code/app/keystyore/debug.keystore")
                storePassword = "12345678"
                keyAlias = "cordova-plugin-amap"
                keyPassword = "12345678"
            }

            release {
                // These must be set or Gradle will complain (even if they are overridden).
                storeFile = "/Users/yangnengkang/workSpace/code/app/keystyore/release.keystore"
                keyPassword = "12345678" // And these must be set to non-empty in order to have the signing step added to the task graph.
                keyAlias = "cordova-plugin-amap"
                storePassword = "12345678"
            }
        }
        buildTypes {
            release {
                signingConfig signingConfigs.release
            }

            debug {
                signingConfig signingConfigs.debug
            }
        }