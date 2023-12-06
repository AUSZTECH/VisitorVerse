import { extendTheme } from "native-base"
import COLORS from "../COLORS"

const theme = extendTheme({

    fontConfig: {
        Montserrat: {
            100: {
                normal: "Montserrat-Light",
                italic: "Montserrat-LightItalic",
            },
            200: {
                normal: "Montserrat-Light",
                italic: "Montserrat-LightItalic",
            },
            300: {
                normal: "Montserrat-Light",
                italic: "Montserrat-LightItalic",
            },
            400: {
                normal: "Montserrat-Regular",
                italic: "Montserrat-Italic",
            },
            500: {
                normal: "Montserrat-Medium",
            },
            600: {
                normal: "Montserrat-Medium",
                italic: "Montserrat-MediumItalic",
            },
            700: {
                normal: 'Montserrat-Bold',
            },
            800: {
                normal: 'Montserrat-Bold',
                italic: 'Montserrat-BoldItalic',
            },
            900: {
                normal: 'Montserrat-Bold',
                italic: 'Montserrat-BoldItalic',
            },
        },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
        heading: "Montserrat",
        body: "Montserrat",
        mono: "Montserrat",
    },


    colors: {
        primary: {
            50: '#aeddd6',
            100: '#9ad5cc',
            200: '#85ccc2',
            300: '#71c4b8',
            400: '#5dbbad',
            500: '#48b3a3',
            600: '#34aa99',
            700: '#2f998a',
            800: '#2a887a',
            900: '#24776b'
        },
        secondary: {
            50: '#dafce5',
            100: '#d1fbdf',
            200: '#c8fad9',
            300: '#bff9d2',
            400: '#b5f9cc',
            500: '#acf8c5',
            600: '#a3f7bf',
            700: '#93deac',
            800: '#82c699',
            900: '#72ad86',
        },
    },

    components: {
        Box: {
            variants: {
                container: {
                    flex: 1,
                    backgroundColor: COLORS.backgroundColor,
                    
                },

                card: {
                    p: 3,
                    borderRadius: 15,
                    backgroundColor: '#FFF',
                    shadowColor: "#000000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.17,
                    shadowRadius: 3.05,
                    elevation: 4
                },
            }
        },

        Card: {
            baseStyle: {
                backgroundColor: 'white',
                borderRadius: 15,
            }
        },

        Button: {
            baseStyle: {
                // height: 12,
                // minWidth: 125,
                borderRadius: 10,
                // shadowColor: "#000",
                // shadowOffset: {
                //     width: 0,
                //     height: 3,
                // },
                // shadowOpacity: 0.27,
                // shadowRadius: 4.65,

                // elevation: 6,
            }
        },

        IconButton: {
            baseStyle: {
                borderRadius: 10
            }
        },

        Input: {
            baseStyle: {
                // height: 10,
                borderRadius: 10
            },
            defaultProps: {
                fontSize: 16
            }
        },

        FormControlLabel: {
            baseStyle: {
                _text: {
                    fontSize: 14
                }
            }
        },

        Heading: {
            baseStyle: {
                color: 'primary.600',
                fontFamily: 'heading'
            }
        },

        ScrollView: {
            defaultProps: {
                indicatorStyle: {
                    padding: 10,
                    backgroundColor: '#fff'
                }
            }
        },

        Stack: {
            variants: {
                container: {
                    padding: 4,
                    defaultProps: {
                        space: 4
                    }
                }
            }
        },

        Menu: {
            baseStyle: {
                borderRadius: 15,
                py: 0,
            }
        },

        Toast: {
            baseStyle: {
                bg: 'primary.600',
                rounded: 'lg',
                opacity: 0.9,

            },
        },

    }
})

export default theme