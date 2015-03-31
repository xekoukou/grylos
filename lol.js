reusable: 
{
    "set": {},
    "functions": {}
}
dynamic: 
{
    "set": {},
    "functions": {}
}
single_use: 
{
    "set": {},
    "functions": {}
}
{
    "/main": {
        "pointer": [
            "",
            "main"
        ],
        "inputs": {},
        "outputs": {
            "source_path": [
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "generate_xml_content_from_children"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "check_node_properties"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "delete_generated_src"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "remove_generated_XML"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "validate_XML"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "check_only_side_effects_exist"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "generate_function_src"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "create_flattened_graph"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_node_properties"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_starting_points"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "generate_src"
                    ],
                    "end_vname": "source_path"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "source_path",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "index_functions"
                    ],
                    "end_vname": "source_path"
                }
            ],
            "prog_lang": [
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "prog_lang",
                    "end_pointer": [
                        "",
                        "generate_function_src"
                    ],
                    "end_vname": "prog_lang"
                },
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "prog_lang",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "generate_src"
                    ],
                    "end_vname": "prog_lang"
                }
            ],
            "root_io": [
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "root_io",
                    "end_pointer": [
                        "",
                        "check_only_side_effects_exist"
                    ],
                    "end_vname": "root_io"
                }
            ],
            "gen_all": [
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "gen_all",
                    "end_pointer": [
                        "",
                        "generate_function_src"
                    ],
                    "end_vname": "gen_all"
                }
            ],
            "single_threaded": [
                {
                    "origin_pointer": [
                        "",
                        "main"
                    ],
                    "properties": {},
                    "origin_vname": "single_threaded",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_node_properties"
                    ],
                    "end_vname": "single_threaded"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/generate_xml_content_from_children": {
        "pointer": [
            "",
            "generate_xml_content_from_children"
        ],
        "inputs": {
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "generate_xml_content_from_children"
                ],
                "end_vname": "source_path"
            },
            "insert_graph_content_to_xml_files_dep": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_graph_content_to_xml_files"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "insert_graph_content_to_xml_files_dep",
                "end_pointer": [
                    "",
                    "generate_xml_content_from_children"
                ],
                "end_vname": "insert_graph_content_to_xml_files_dep"
            },
            "insert_missing_io_tags_from_graph_dep": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_missing_io_tags_from_graph"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "insert_missing_io_tags_from_graph_dep",
                "end_pointer": [
                    "",
                    "generate_xml_content_from_children"
                ],
                "end_vname": "insert_missing_io_tags_from_graph_dep"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "generate_xml_content_from_children"
                ],
                "end_vname": "fs"
            },
            "path": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "path",
                "end_pointer": [
                    "",
                    "generate_xml_content_from_children"
                ],
                "end_vname": "path"
            }
        },
        "outputs": {
            "generate_xml_content_from_children_dep": [
                {
                    "origin_pointer": [
                        "",
                        "generate_xml_content_from_children"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "generate_xml_content_from_children_dep",
                    "end_pointer": [
                        "",
                        "check_ioputs_origins"
                    ],
                    "end_vname": "generate_xml_content_from_children_dep"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/check_ioputs_origins": {
        "pointer": [
            "",
            "check_ioputs_origins"
        ],
        "inputs": {
            "generate_xml_content_from_children_dep": {
                "origin_pointer": [
                    "",
                    "generate_xml_content_from_children"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "generate_xml_content_from_children_dep",
                "end_pointer": [
                    "",
                    "check_ioputs_origins"
                ],
                "end_vname": "generate_xml_content_from_children_dep"
            },
            "mr_file_paths": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "properties": {},
                "origin_vname": "mr_file_paths",
                "end_pointer": [
                    "",
                    "check_ioputs_origins"
                ],
                "end_vname": "mr_file_paths"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "check_ioputs_origins"
                ],
                "end_vname": "fs"
            },
            "cheerio": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "cheerio",
                "end_pointer": [
                    "",
                    "check_ioputs_origins"
                ],
                "end_vname": "cheerio"
            }
        },
        "outputs": {
            "check_ioputs_origins_dep": [
                {
                    "origin_pointer": [
                        "",
                        "check_ioputs_origins"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "check_ioputs_origins_dep",
                    "end_pointer": [
                        "",
                        "check_only_side_effects_exist"
                    ],
                    "end_vname": "check_ioputs_origins_dep"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/check_only_side_effects_exist": {
        "pointer": [
            "",
            "check_only_side_effects_exist"
        ],
        "inputs": {
            "check_ioputs_origins_dep": {
                "origin_pointer": [
                    "",
                    "check_ioputs_origins"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "check_ioputs_origins_dep",
                "end_pointer": [
                    "",
                    "check_only_side_effects_exist"
                ],
                "end_vname": "check_ioputs_origins_dep"
            },
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "check_only_side_effects_exist"
                ],
                "end_vname": "source_path"
            },
            "root_io": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "root_io",
                "end_pointer": [
                    "",
                    "check_only_side_effects_exist"
                ],
                "end_vname": "root_io"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "check_only_side_effects_exist"
                ],
                "end_vname": "fs"
            },
            "cheerio": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "cheerio",
                "end_pointer": [
                    "",
                    "check_only_side_effects_exist"
                ],
                "end_vname": "cheerio"
            }
        },
        "outputs": {
            "check_only_side_effects_exist_dep": [
                {
                    "origin_pointer": [
                        "",
                        "check_only_side_effects_exist"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "check_only_side_effects_exist_dep",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_node_properties"
                    ],
                    "end_vname": "check_only_side_effects_exist_dep"
                },
                {
                    "origin_pointer": [
                        "",
                        "check_only_side_effects_exist"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "check_only_side_effects_exist_dep",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_starting_points"
                    ],
                    "end_vname": "check_only_side_effects_exist_dep"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/generate_src/flatten_graph/find_node_properties": {
        "pointer": [
            "",
            "generate_src",
            "flatten_graph",
            "find_node_properties"
        ],
        "inputs": {
            "check_only_side_effects_exist_dep": {
                "origin_pointer": [
                    "",
                    "check_only_side_effects_exist"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "check_only_side_effects_exist_dep",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_node_properties"
                ],
                "end_vname": "check_only_side_effects_exist_dep"
            },
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_node_properties"
                ],
                "end_vname": "source_path"
            },
            "single_threaded": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "single_threaded",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_node_properties"
                ],
                "end_vname": "single_threaded"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_node_properties"
                ],
                "end_vname": "fs"
            },
            "path": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "path",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_node_properties"
                ],
                "end_vname": "path"
            },
            "cheerio": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "cheerio",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_node_properties"
                ],
                "end_vname": "cheerio"
            }
        },
        "outputs": {
            "node_properties": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_node_properties"
                    ],
                    "properties": {},
                    "origin_vname": "node_properties",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "create_flattened_graph"
                    ],
                    "end_vname": "node_properties"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/generate_src/flatten_graph/create_flattened_graph": {
        "pointer": [
            "",
            "generate_src",
            "flatten_graph",
            "create_flattened_graph"
        ],
        "inputs": {
            "node_properties": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_node_properties"
                ],
                "properties": {},
                "origin_vname": "node_properties",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "create_flattened_graph"
                ],
                "end_vname": "node_properties"
            },
            "starting_points": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_starting_points"
                ],
                "properties": {},
                "origin_vname": "starting_points",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "create_flattened_graph"
                ],
                "end_vname": "starting_points"
            },
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "create_flattened_graph"
                ],
                "end_vname": "source_path"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "create_flattened_graph"
                ],
                "end_vname": "fs"
            },
            "cheerio": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "cheerio",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "create_flattened_graph"
                ],
                "end_vname": "cheerio"
            }
        },
        "outputs": {
            "flattened_graph": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "create_flattened_graph"
                    ],
                    "properties": {},
                    "origin_vname": "flattened_graph",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "determine_subgraphs"
                    ],
                    "end_vname": "flattened_graph"
                },
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "create_flattened_graph"
                    ],
                    "properties": {},
                    "origin_vname": "flattened_graph",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "level_graph"
                    ],
                    "end_vname": "flattened_graph"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/generate_src/determine_subgraphs": {
        "pointer": [
            "",
            "generate_src",
            "determine_subgraphs"
        ],
        "inputs": {
            "flattened_graph": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "create_flattened_graph"
                ],
                "properties": {},
                "origin_vname": "flattened_graph",
                "end_pointer": [
                    "",
                    "generate_src",
                    "determine_subgraphs"
                ],
                "end_vname": "flattened_graph"
            },
            "level_graph_dep": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "level_graph"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "level_graph_dep",
                "end_pointer": [
                    "",
                    "generate_src",
                    "determine_subgraphs"
                ],
                "end_vname": "level_graph_dep"
            },
            "starting_points": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_starting_points"
                ],
                "properties": {},
                "origin_vname": "starting_points",
                "end_pointer": [
                    "",
                    "generate_src",
                    "determine_subgraphs"
                ],
                "end_vname": "starting_points"
            }
        },
        "outputs": {
            "deter_subg": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "determine_subgraphs"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "deter_subg",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "determine_subgraph_order_str_points"
                    ],
                    "end_vname": "deter_subg"
                }
            ],
            "flattened_graph_v2": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "determine_subgraphs"
                    ],
                    "properties": {},
                    "origin_vname": "flattened_graph_v2",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "determine_subgraph_order_str_points"
                    ],
                    "end_vname": "flattened_graph_v2"
                }
            ]
        },
        "properties": {
            "concurrent": 1,
            "set": 2,
            "passed": true
        }
    },
    "/generate_src/determine_subgraph_order_str_points": {
        "pointer": [
            "",
            "generate_src",
            "determine_subgraph_order_str_points"
        ],
        "inputs": {
            "deter_subg": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "determine_subgraphs"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "deter_subg",
                "end_pointer": [
                    "",
                    "generate_src",
                    "determine_subgraph_order_str_points"
                ],
                "end_vname": "deter_subg"
            },
            "flattened_graph_v2": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "determine_subgraphs"
                ],
                "properties": {},
                "origin_vname": "flattened_graph_v2",
                "end_pointer": [
                    "",
                    "generate_src",
                    "determine_subgraph_order_str_points"
                ],
                "end_vname": "flattened_graph_v2"
            },
            "starting_points": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_starting_points"
                ],
                "properties": {},
                "origin_vname": "starting_points",
                "end_pointer": [
                    "",
                    "generate_src",
                    "determine_subgraph_order_str_points"
                ],
                "end_vname": "starting_points"
            }
        },
        "outputs": {
            "thread_starting_points": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "determine_subgraph_order_str_points"
                    ],
                    "properties": {},
                    "origin_vname": "thread_starting_points",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "merge_serial_subgraphs"
                    ],
                    "end_vname": "thread_starting_points"
                }
            ],
            "flattened_graph_v3": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "determine_subgraph_order_str_points"
                    ],
                    "properties": {},
                    "origin_vname": "flattened_graph_v3",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "merge_serial_subgraphs"
                    ],
                    "end_vname": "flattened_graph_v3"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 3,
            "passed": true
        }
    },
    "/generate_src/merge_serial_subgraphs": {
        "pointer": [
            "",
            "generate_src",
            "merge_serial_subgraphs"
        ],
        "inputs": {
            "thread_starting_points": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "determine_subgraph_order_str_points"
                ],
                "properties": {},
                "origin_vname": "thread_starting_points",
                "end_pointer": [
                    "",
                    "generate_src",
                    "merge_serial_subgraphs"
                ],
                "end_vname": "thread_starting_points"
            },
            "flattened_graph_v3": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "determine_subgraph_order_str_points"
                ],
                "properties": {},
                "origin_vname": "flattened_graph_v3",
                "end_pointer": [
                    "",
                    "generate_src",
                    "merge_serial_subgraphs"
                ],
                "end_vname": "flattened_graph_v3"
            },
            "starting_points": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_starting_points"
                ],
                "properties": {},
                "origin_vname": "starting_points",
                "end_pointer": [
                    "",
                    "generate_src",
                    "merge_serial_subgraphs"
                ],
                "end_vname": "starting_points"
            }
        },
        "outputs": {
            "merge_ser_subg": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "merge_serial_subgraphs"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "merge_ser_subg",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "generate_src"
                    ],
                    "end_vname": "merge_ser_subg"
                }
            ],
            "flattened_graph_v4": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "merge_serial_subgraphs"
                    ],
                    "properties": {},
                    "origin_vname": "flattened_graph_v4",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "generate_src"
                    ],
                    "end_vname": "flattened_graph_v4"
                }
            ],
            "thread_starting_points_v2": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "merge_serial_subgraphs"
                    ],
                    "properties": {},
                    "origin_vname": "thread_starting_points_v2",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "generate_src"
                    ],
                    "end_vname": "thread_starting_points_v2"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 3,
            "passed": true
        }
    },
    "/generate_src/generate_src": {
        "pointer": [
            "",
            "generate_src",
            "generate_src"
        ],
        "inputs": {
            "merge_ser_subg": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "merge_serial_subgraphs"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "merge_ser_subg",
                "end_pointer": [
                    "",
                    "generate_src",
                    "generate_src"
                ],
                "end_vname": "merge_ser_subg"
            },
            "flattened_graph_v4": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "merge_serial_subgraphs"
                ],
                "properties": {},
                "origin_vname": "flattened_graph_v4",
                "end_pointer": [
                    "",
                    "generate_src",
                    "generate_src"
                ],
                "end_vname": "flattened_graph_v4"
            },
            "thread_starting_points_v2": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "merge_serial_subgraphs"
                ],
                "properties": {},
                "origin_vname": "thread_starting_points_v2",
                "end_pointer": [
                    "",
                    "generate_src",
                    "generate_src"
                ],
                "end_vname": "thread_starting_points_v2"
            },
            "leveled_graph": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "level_graph"
                ],
                "properties": {},
                "origin_vname": "leveled_graph",
                "end_pointer": [
                    "",
                    "generate_src",
                    "generate_src"
                ],
                "end_vname": "leveled_graph"
            },
            "starting_points": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_starting_points"
                ],
                "properties": {},
                "origin_vname": "starting_points",
                "end_pointer": [
                    "",
                    "generate_src",
                    "generate_src"
                ],
                "end_vname": "starting_points"
            },
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "generate_src",
                    "generate_src"
                ],
                "end_vname": "source_path"
            },
            "prog_lang": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "prog_lang",
                "end_pointer": [
                    "",
                    "generate_src",
                    "generate_src"
                ],
                "end_vname": "prog_lang"
            },
            "path": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "path",
                "end_pointer": [
                    "",
                    "generate_src",
                    "generate_src"
                ],
                "end_vname": "path"
            }
        },
        "outputs": {},
        "properties": {
            "concurrent": 0,
            "set": 3,
            "passed": true
        }
    },
    "/generate_src/level_graph": {
        "pointer": [
            "",
            "generate_src",
            "level_graph"
        ],
        "inputs": {
            "flattened_graph": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "create_flattened_graph"
                ],
                "properties": {},
                "origin_vname": "flattened_graph",
                "end_pointer": [
                    "",
                    "generate_src",
                    "level_graph"
                ],
                "end_vname": "flattened_graph"
            }
        },
        "outputs": {
            "level_graph_dep": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "level_graph"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "level_graph_dep",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "determine_subgraphs"
                    ],
                    "end_vname": "level_graph_dep"
                }
            ],
            "leveled_graph": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "level_graph"
                    ],
                    "properties": {},
                    "origin_vname": "leveled_graph",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "generate_src"
                    ],
                    "end_vname": "leveled_graph"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/generate_src/flatten_graph/find_starting_points": {
        "pointer": [
            "",
            "generate_src",
            "flatten_graph",
            "find_starting_points"
        ],
        "inputs": {
            "check_only_side_effects_exist_dep": {
                "origin_pointer": [
                    "",
                    "check_only_side_effects_exist"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "check_only_side_effects_exist_dep",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_starting_points"
                ],
                "end_vname": "check_only_side_effects_exist_dep"
            },
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_starting_points"
                ],
                "end_vname": "source_path"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_starting_points"
                ],
                "end_vname": "fs"
            },
            "path": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "path",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_starting_points"
                ],
                "end_vname": "path"
            },
            "cheerio": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "cheerio",
                "end_pointer": [
                    "",
                    "generate_src",
                    "flatten_graph",
                    "find_starting_points"
                ],
                "end_vname": "cheerio"
            }
        },
        "outputs": {
            "starting_points": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_starting_points"
                    ],
                    "properties": {},
                    "origin_vname": "starting_points",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "create_flattened_graph"
                    ],
                    "end_vname": "starting_points"
                },
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_starting_points"
                    ],
                    "properties": {},
                    "origin_vname": "starting_points",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "determine_subgraphs"
                    ],
                    "end_vname": "starting_points"
                },
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_starting_points"
                    ],
                    "properties": {},
                    "origin_vname": "starting_points",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "determine_subgraph_order_str_points"
                    ],
                    "end_vname": "starting_points"
                },
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_starting_points"
                    ],
                    "properties": {},
                    "origin_vname": "starting_points",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "merge_serial_subgraphs"
                    ],
                    "end_vname": "starting_points"
                },
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_starting_points"
                    ],
                    "properties": {},
                    "origin_vname": "starting_points",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "generate_src"
                    ],
                    "end_vname": "starting_points"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/parse_mr_files/check_node_properties": {
        "pointer": [
            "",
            "parse_mr_files",
            "check_node_properties"
        ],
        "inputs": {
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "check_node_properties"
                ],
                "end_vname": "source_path"
            },
            "graphs": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "build_graph"
                ],
                "properties": {},
                "origin_vname": "graphs",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "check_node_properties"
                ],
                "end_vname": "graphs"
            },
            "mr_file_paths": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "properties": {},
                "origin_vname": "mr_file_paths",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "check_node_properties"
                ],
                "end_vname": "mr_file_paths"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "check_node_properties"
                ],
                "end_vname": "fs"
            },
            "cheerio": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "cheerio",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "check_node_properties"
                ],
                "end_vname": "cheerio"
            }
        },
        "outputs": {
            "dep_2": [
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "check_node_properties"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "dep_2",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_graph_content_to_xml_files"
                    ],
                    "end_vname": "dep_2"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/parse_mr_files/insert_graph_content_to_xml_files": {
        "pointer": [
            "",
            "parse_mr_files",
            "insert_graph_content_to_xml_files"
        ],
        "inputs": {
            "dep_2": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "check_node_properties"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "dep_2",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_graph_content_to_xml_files"
                ],
                "end_vname": "dep_2"
            },
            "graphs": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "build_graph"
                ],
                "properties": {},
                "origin_vname": "graphs",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_graph_content_to_xml_files"
                ],
                "end_vname": "graphs"
            },
            "check_same_output_name_dep": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "check_same_output_name"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "check_same_output_name_dep",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_graph_content_to_xml_files"
                ],
                "end_vname": "check_same_output_name_dep"
            },
            "mr_file_paths": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "properties": {},
                "origin_vname": "mr_file_paths",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_graph_content_to_xml_files"
                ],
                "end_vname": "mr_file_paths"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_graph_content_to_xml_files"
                ],
                "end_vname": "fs"
            },
            "cheerio": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "cheerio",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_graph_content_to_xml_files"
                ],
                "end_vname": "cheerio"
            }
        },
        "outputs": {
            "insert_graph_content_to_xml_files_dep": [
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_graph_content_to_xml_files"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "insert_graph_content_to_xml_files_dep",
                    "end_pointer": [
                        "",
                        "generate_xml_content_from_children"
                    ],
                    "end_vname": "insert_graph_content_to_xml_files_dep"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/parse_mr_files/find_mr_file_paths": {
        "pointer": [
            "",
            "parse_mr_files",
            "find_mr_file_paths"
        ],
        "inputs": {
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "end_vname": "source_path"
            },
            "validate_XML_dep": {
                "origin_pointer": [
                    "",
                    "prepare_src",
                    "validate_XML"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "validate_XML_dep",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "end_vname": "validate_XML_dep"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "end_vname": "fs"
            },
            "path": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "path",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "end_vname": "path"
            }
        },
        "outputs": {
            "mr_files": [
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "properties": {},
                    "origin_vname": "mr_files",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "split_srcode_into_lines"
                    ],
                    "end_vname": "mr_files"
                }
            ],
            "mr_file_paths": [
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "properties": {},
                    "origin_vname": "mr_file_paths",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "build_graph"
                    ],
                    "end_vname": "mr_file_paths"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "properties": {},
                    "origin_vname": "mr_file_paths",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "find_functions"
                    ],
                    "end_vname": "mr_file_paths"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "properties": {},
                    "origin_vname": "mr_file_paths",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "path_traversal"
                    ],
                    "end_vname": "mr_file_paths"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "properties": {},
                    "origin_vname": "mr_file_paths",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_missing_io_tags_from_graph"
                    ],
                    "end_vname": "mr_file_paths"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "properties": {},
                    "origin_vname": "mr_file_paths",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_graph_content_to_xml_files"
                    ],
                    "end_vname": "mr_file_paths"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "properties": {},
                    "origin_vname": "mr_file_paths",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "check_same_output_name"
                    ],
                    "end_vname": "mr_file_paths"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "properties": {},
                    "origin_vname": "mr_file_paths",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "check_node_properties"
                    ],
                    "end_vname": "mr_file_paths"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "properties": {},
                    "origin_vname": "mr_file_paths",
                    "end_pointer": [
                        "",
                        "check_ioputs_origins"
                    ],
                    "end_vname": "mr_file_paths"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/parse_mr_files/split_srcode_into_lines": {
        "pointer": [
            "",
            "parse_mr_files",
            "split_srcode_into_lines"
        ],
        "inputs": {
            "mr_files": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "properties": {},
                "origin_vname": "mr_files",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "split_srcode_into_lines"
                ],
                "end_vname": "mr_files"
            }
        },
        "outputs": {
            "srcodes": [
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "split_srcode_into_lines"
                    ],
                    "properties": {},
                    "origin_vname": "srcodes",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "find_end_points"
                    ],
                    "end_vname": "srcodes"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "split_srcode_into_lines"
                    ],
                    "properties": {},
                    "origin_vname": "srcodes",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "find_functions"
                    ],
                    "end_vname": "srcodes"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "split_srcode_into_lines"
                    ],
                    "properties": {},
                    "origin_vname": "srcodes",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "path_traversal"
                    ],
                    "end_vname": "srcodes"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/parse_mr_files/create_graphs/find_end_points": {
        "pointer": [
            "",
            "parse_mr_files",
            "create_graphs",
            "find_end_points"
        ],
        "inputs": {
            "srcodes": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "split_srcode_into_lines"
                ],
                "properties": {},
                "origin_vname": "srcodes",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "find_end_points"
                ],
                "end_vname": "srcodes"
            },
            "function_names": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "find_functions"
                ],
                "properties": {},
                "origin_vname": "function_names",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "find_end_points"
                ],
                "end_vname": "function_names"
            }
        },
        "outputs": {
            "end_points": [
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "find_end_points"
                    ],
                    "properties": {},
                    "origin_vname": "end_points",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "path_traversal"
                    ],
                    "end_vname": "end_points"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/parse_mr_files/create_graphs/path_traversal": {
        "pointer": [
            "",
            "parse_mr_files",
            "create_graphs",
            "path_traversal"
        ],
        "inputs": {
            "end_points": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "find_end_points"
                ],
                "properties": {},
                "origin_vname": "end_points",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "path_traversal"
                ],
                "end_vname": "end_points"
            },
            "srcodes": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "split_srcode_into_lines"
                ],
                "properties": {},
                "origin_vname": "srcodes",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "path_traversal"
                ],
                "end_vname": "srcodes"
            },
            "mr_file_paths": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "properties": {},
                "origin_vname": "mr_file_paths",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "path_traversal"
                ],
                "end_vname": "mr_file_paths"
            }
        },
        "outputs": {
            "gpaths": [
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "path_traversal"
                    ],
                    "properties": {},
                    "origin_vname": "gpaths",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "build_graph"
                    ],
                    "end_vname": "gpaths"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/parse_mr_files/create_graphs/build_graph": {
        "pointer": [
            "",
            "parse_mr_files",
            "create_graphs",
            "build_graph"
        ],
        "inputs": {
            "gpaths": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "path_traversal"
                ],
                "properties": {},
                "origin_vname": "gpaths",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "build_graph"
                ],
                "end_vname": "gpaths"
            },
            "function_names": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "find_functions"
                ],
                "properties": {},
                "origin_vname": "function_names",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "build_graph"
                ],
                "end_vname": "function_names"
            },
            "mr_file_paths": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "properties": {},
                "origin_vname": "mr_file_paths",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "build_graph"
                ],
                "end_vname": "mr_file_paths"
            }
        },
        "outputs": {
            "graphs": [
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "build_graph"
                    ],
                    "properties": {},
                    "origin_vname": "graphs",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_graph_content_to_xml_files"
                    ],
                    "end_vname": "graphs"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "build_graph"
                    ],
                    "properties": {},
                    "origin_vname": "graphs",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "check_same_output_name"
                    ],
                    "end_vname": "graphs"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "build_graph"
                    ],
                    "properties": {},
                    "origin_vname": "graphs",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_missing_io_tags_from_graph"
                    ],
                    "end_vname": "graphs"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "build_graph"
                    ],
                    "properties": {},
                    "origin_vname": "graphs",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "check_node_properties"
                    ],
                    "end_vname": "graphs"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/parse_mr_files/check_same_output_name": {
        "pointer": [
            "",
            "parse_mr_files",
            "check_same_output_name"
        ],
        "inputs": {
            "graphs": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "build_graph"
                ],
                "properties": {},
                "origin_vname": "graphs",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "check_same_output_name"
                ],
                "end_vname": "graphs"
            },
            "mr_file_paths": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "properties": {},
                "origin_vname": "mr_file_paths",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "check_same_output_name"
                ],
                "end_vname": "mr_file_paths"
            }
        },
        "outputs": {
            "check_same_output_name_dep": [
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "check_same_output_name"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "check_same_output_name_dep",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_graph_content_to_xml_files"
                    ],
                    "end_vname": "check_same_output_name_dep"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/parse_mr_files/insert_missing_io_tags_from_graph": {
        "pointer": [
            "",
            "parse_mr_files",
            "insert_missing_io_tags_from_graph"
        ],
        "inputs": {
            "graphs": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "build_graph"
                ],
                "properties": {},
                "origin_vname": "graphs",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_missing_io_tags_from_graph"
                ],
                "end_vname": "graphs"
            },
            "mr_file_paths": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "properties": {},
                "origin_vname": "mr_file_paths",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_missing_io_tags_from_graph"
                ],
                "end_vname": "mr_file_paths"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_missing_io_tags_from_graph"
                ],
                "end_vname": "fs"
            },
            "cheerio": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "cheerio",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "insert_missing_io_tags_from_graph"
                ],
                "end_vname": "cheerio"
            }
        },
        "outputs": {
            "insert_missing_io_tags_from_graph_dep": [
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_missing_io_tags_from_graph"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "insert_missing_io_tags_from_graph_dep",
                    "end_pointer": [
                        "",
                        "generate_xml_content_from_children"
                    ],
                    "end_vname": "insert_missing_io_tags_from_graph_dep"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/parse_mr_files/create_graphs/find_functions": {
        "pointer": [
            "",
            "parse_mr_files",
            "create_graphs",
            "find_functions"
        ],
        "inputs": {
            "srcodes": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "split_srcode_into_lines"
                ],
                "properties": {},
                "origin_vname": "srcodes",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "find_functions"
                ],
                "end_vname": "srcodes"
            },
            "mr_file_paths": {
                "origin_pointer": [
                    "",
                    "parse_mr_files",
                    "find_mr_file_paths"
                ],
                "properties": {},
                "origin_vname": "mr_file_paths",
                "end_pointer": [
                    "",
                    "parse_mr_files",
                    "create_graphs",
                    "find_functions"
                ],
                "end_vname": "mr_file_paths"
            }
        },
        "outputs": {
            "function_names": [
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "find_functions"
                    ],
                    "properties": {},
                    "origin_vname": "function_names",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "find_end_points"
                    ],
                    "end_vname": "function_names"
                },
                {
                    "origin_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "find_functions"
                    ],
                    "properties": {},
                    "origin_vname": "function_names",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "create_graphs",
                        "build_graph"
                    ],
                    "end_vname": "function_names"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/prepare_src/delete_generated_src": {
        "pointer": [
            "",
            "prepare_src",
            "delete_generated_src"
        ],
        "inputs": {
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "delete_generated_src"
                ],
                "end_vname": "source_path"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "delete_generated_src"
                ],
                "end_vname": "fs"
            },
            "path": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "path",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "delete_generated_src"
                ],
                "end_vname": "path"
            }
        },
        "outputs": {
            "delete_generated_src_dep": [
                {
                    "origin_pointer": [
                        "",
                        "prepare_src",
                        "delete_generated_src"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "delete_generated_src_dep",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "validate_XML"
                    ],
                    "end_vname": "delete_generated_src_dep"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/prepare_src/validate_XML": {
        "pointer": [
            "",
            "prepare_src",
            "validate_XML"
        ],
        "inputs": {
            "delete_generated_src_dep": {
                "origin_pointer": [
                    "",
                    "prepare_src",
                    "delete_generated_src"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "delete_generated_src_dep",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "validate_XML"
                ],
                "end_vname": "delete_generated_src_dep"
            },
            "remove_generated_XML_dep": {
                "origin_pointer": [
                    "",
                    "prepare_src",
                    "remove_generated_XML"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "remove_generated_XML_dep",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "validate_XML"
                ],
                "end_vname": "remove_generated_XML_dep"
            },
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "validate_XML"
                ],
                "end_vname": "source_path"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "validate_XML"
                ],
                "end_vname": "fs"
            },
            "exec": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "exec",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "validate_XML"
                ],
                "end_vname": "exec"
            },
            "path": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "path",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "validate_XML"
                ],
                "end_vname": "path"
            }
        },
        "outputs": {
            "validate_XML_dep": [
                {
                    "origin_pointer": [
                        "",
                        "prepare_src",
                        "validate_XML"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "validate_XML_dep",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "end_vname": "validate_XML_dep"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/prepare_src/remove_generated_XML": {
        "pointer": [
            "",
            "prepare_src",
            "remove_generated_XML"
        ],
        "inputs": {
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "remove_generated_XML"
                ],
                "end_vname": "source_path"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "remove_generated_XML"
                ],
                "end_vname": "fs"
            },
            "path": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "path",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "remove_generated_XML"
                ],
                "end_vname": "path"
            },
            "cheerio": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "cheerio",
                "end_pointer": [
                    "",
                    "prepare_src",
                    "remove_generated_XML"
                ],
                "end_vname": "cheerio"
            }
        },
        "outputs": {
            "remove_generated_XML_dep": [
                {
                    "origin_pointer": [
                        "",
                        "prepare_src",
                        "remove_generated_XML"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "remove_generated_XML_dep",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "validate_XML"
                    ],
                    "end_vname": "remove_generated_XML_dep"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/generate_function_src": {
        "pointer": [
            "",
            "generate_function_src"
        ],
        "inputs": {
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "generate_function_src"
                ],
                "end_vname": "source_path"
            },
            "prog_lang": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "prog_lang",
                "end_pointer": [
                    "",
                    "generate_function_src"
                ],
                "end_vname": "prog_lang"
            },
            "gen_all": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "gen_all",
                "end_pointer": [
                    "",
                    "generate_function_src"
                ],
                "end_vname": "gen_all"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "generate_function_src"
                ],
                "end_vname": "fs"
            },
            "exec": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "exec",
                "end_pointer": [
                    "",
                    "generate_function_src"
                ],
                "end_vname": "exec"
            }
        },
        "outputs": {
            "generate_function_src_deb": [
                {
                    "origin_pointer": [
                        "",
                        "generate_function_src"
                    ],
                    "properties": {
                        "dependency": "true"
                    },
                    "origin_vname": "generate_function_src_deb",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "index_functions"
                    ],
                    "end_vname": "generate_function_src_deb"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/generate_src/index_functions": {
        "pointer": [
            "",
            "generate_src",
            "index_functions"
        ],
        "inputs": {
            "generate_function_src_deb": {
                "origin_pointer": [
                    "",
                    "generate_function_src"
                ],
                "properties": {
                    "dependency": "true"
                },
                "origin_vname": "generate_function_src_deb",
                "end_pointer": [
                    "",
                    "generate_src",
                    "index_functions"
                ],
                "end_vname": "generate_function_src_deb"
            },
            "source_path": {
                "origin_pointer": [
                    "",
                    "main"
                ],
                "properties": {},
                "origin_vname": "source_path",
                "end_pointer": [
                    "",
                    "generate_src",
                    "index_functions"
                ],
                "end_vname": "source_path"
            },
            "fs": {
                "origin_pointer": [
                    "",
                    "module_dependencies"
                ],
                "properties": {},
                "origin_vname": "fs",
                "end_pointer": [
                    "",
                    "generate_src",
                    "index_functions"
                ],
                "end_vname": "fs"
            }
        },
        "outputs": {
            "reusable": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "index_functions"
                    ],
                    "properties": {},
                    "origin_vname": "reusable",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "find_node_historical_dep"
                    ],
                    "end_vname": "reusable"
                }
            ],
            "single_use": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "index_functions"
                    ],
                    "properties": {},
                    "origin_vname": "single_use",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "find_node_historical_dep"
                    ],
                    "end_vname": "single_use"
                }
            ],
            "dynamic": [
                {
                    "origin_pointer": [
                        "",
                        "generate_src",
                        "index_functions"
                    ],
                    "properties": {},
                    "origin_vname": "dynamic",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "find_node_historical_dep"
                    ],
                    "end_vname": "dynamic"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/generate_src/find_node_historical_dep": {
        "pointer": [
            "",
            "generate_src",
            "find_node_historical_dep"
        ],
        "inputs": {
            "reusable": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "index_functions"
                ],
                "properties": {},
                "origin_vname": "reusable",
                "end_pointer": [
                    "",
                    "generate_src",
                    "find_node_historical_dep"
                ],
                "end_vname": "reusable"
            },
            "single_use": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "index_functions"
                ],
                "properties": {},
                "origin_vname": "single_use",
                "end_pointer": [
                    "",
                    "generate_src",
                    "find_node_historical_dep"
                ],
                "end_vname": "single_use"
            },
            "dynamic": {
                "origin_pointer": [
                    "",
                    "generate_src",
                    "index_functions"
                ],
                "properties": {},
                "origin_vname": "dynamic",
                "end_pointer": [
                    "",
                    "generate_src",
                    "find_node_historical_dep"
                ],
                "end_vname": "dynamic"
            }
        },
        "outputs": {},
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    },
    "/module_dependencies": {
        "pointer": [
            "",
            "module_dependencies"
        ],
        "inputs": {},
        "outputs": {
            "fs": [
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "delete_generated_src"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "remove_generated_XML"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "validate_XML"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "generate_xml_content_from_children"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "check_ioputs_origins"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "check_node_properties"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_graph_content_to_xml_files"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_missing_io_tags_from_graph"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "create_flattened_graph"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_node_properties"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_starting_points"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "index_functions"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "generate_function_src"
                    ],
                    "end_vname": "fs"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "fs",
                    "end_pointer": [
                        "",
                        "check_only_side_effects_exist"
                    ],
                    "end_vname": "fs"
                }
            ],
            "exec": [
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "exec",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "validate_XML"
                    ],
                    "end_vname": "exec"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "exec",
                    "end_pointer": [
                        "",
                        "generate_function_src"
                    ],
                    "end_vname": "exec"
                }
            ],
            "path": [
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "path",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "delete_generated_src"
                    ],
                    "end_vname": "path"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "path",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "remove_generated_XML"
                    ],
                    "end_vname": "path"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "path",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "validate_XML"
                    ],
                    "end_vname": "path"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "path",
                    "end_pointer": [
                        "",
                        "generate_xml_content_from_children"
                    ],
                    "end_vname": "path"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "path",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "find_mr_file_paths"
                    ],
                    "end_vname": "path"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "path",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_node_properties"
                    ],
                    "end_vname": "path"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "path",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_starting_points"
                    ],
                    "end_vname": "path"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "path",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "generate_src"
                    ],
                    "end_vname": "path"
                }
            ],
            "cheerio": [
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "cheerio",
                    "end_pointer": [
                        "",
                        "prepare_src",
                        "remove_generated_XML"
                    ],
                    "end_vname": "cheerio"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "cheerio",
                    "end_pointer": [
                        "",
                        "check_ioputs_origins"
                    ],
                    "end_vname": "cheerio"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "cheerio",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "check_node_properties"
                    ],
                    "end_vname": "cheerio"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "cheerio",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_graph_content_to_xml_files"
                    ],
                    "end_vname": "cheerio"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "cheerio",
                    "end_pointer": [
                        "",
                        "parse_mr_files",
                        "insert_missing_io_tags_from_graph"
                    ],
                    "end_vname": "cheerio"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "cheerio",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "create_flattened_graph"
                    ],
                    "end_vname": "cheerio"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "cheerio",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_node_properties"
                    ],
                    "end_vname": "cheerio"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "cheerio",
                    "end_pointer": [
                        "",
                        "generate_src",
                        "flatten_graph",
                        "find_starting_points"
                    ],
                    "end_vname": "cheerio"
                },
                {
                    "origin_pointer": [
                        "",
                        "module_dependencies"
                    ],
                    "properties": {},
                    "origin_vname": "cheerio",
                    "end_pointer": [
                        "",
                        "check_only_side_effects_exist"
                    ],
                    "end_vname": "cheerio"
                }
            ]
        },
        "properties": {
            "concurrent": 0,
            "set": 1,
            "passed": true
        }
    }
}
{
    "name": "",
    "input_local_var": {},
    "input_not_local_var": {},
    "input_external_var": {},
    "input_not_external_var": {},
    "output_external_var": {
        "source_path": [
            [
                "",
                "main"
            ],
            [
                "",
                "main"
            ]
        ],
        "prog_lang": [
            [
                "",
                "main"
            ],
            [
                "",
                "main"
            ]
        ],
        "path": [
            [
                "",
                "module_dependencies"
            ],
            [
                "",
                "module_dependencies"
            ]
        ],
        "root_io": [
            [
                "",
                "main"
            ]
        ],
        "gen_all": [
            [
                "",
                "main"
            ]
        ],
        "single_threaded": [
            [
                "",
                "main"
            ]
        ],
        "fs": [
            [
                "",
                "module_dependencies"
            ]
        ],
        "exec": [
            [
                "",
                "module_dependencies"
            ]
        ],
        "cheerio": [
            [
                "",
                "module_dependencies"
            ]
        ]
    },
    "output_historical_var": {},
    "output_dynamic_var": {},
    "output_not_external_var": {},
    "set": [
        {
            "name": "main",
            "input_local_var": {},
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {},
            "output_external_var": {
                "source_path": [
                    [
                        "",
                        "main"
                    ]
                ],
                "prog_lang": [
                    [
                        "",
                        "main"
                    ]
                ]
            },
            "output_not_external_var": {
                "root_io": true,
                "gen_all": true,
                "single_threaded": true
            },
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "node"
        },
        {
            "name": "module_dependencies",
            "input_local_var": {},
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {},
            "output_external_var": {
                "path": [
                    [
                        "",
                        "module_dependencies"
                    ]
                ]
            },
            "output_not_external_var": {
                "fs": true,
                "exec": true,
                "cheerio": true
            },
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "node"
        },
        {
            "name": "prepare_src",
            "input_local_var": {
                "source_path": true,
                "fs": true,
                "path": true,
                "cheerio": true,
                "exec": true
            },
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {
                "source_path": true,
                "fs": true,
                "path": true,
                "cheerio": true,
                "exec": true
            },
            "output_external_var": {},
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [
                {
                    "name": "delete_generated_src",
                    "input_local_var": {},
                    "input_not_local_var": {
                        "source_path": true,
                        "fs": true,
                        "path": true
                    },
                    "input_external_var": {},
                    "input_not_external_var": {
                        "source_path": true,
                        "fs": true,
                        "path": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "remove_generated_XML",
                    "input_local_var": {},
                    "input_not_local_var": {
                        "source_path": true,
                        "fs": true,
                        "path": true,
                        "cheerio": true
                    },
                    "input_external_var": {},
                    "input_not_external_var": {
                        "source_path": true,
                        "fs": true,
                        "path": true,
                        "cheerio": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "validate_XML",
                    "input_local_var": {},
                    "input_not_local_var": {
                        "source_path": true,
                        "fs": true,
                        "exec": true,
                        "path": true
                    },
                    "input_external_var": {},
                    "input_not_external_var": {
                        "source_path": true,
                        "fs": true,
                        "exec": true,
                        "path": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                }
            ],
            "type": "subgraph"
        },
        {
            "name": "generate_function_src",
            "input_local_var": {
                "source_path": true,
                "prog_lang": true,
                "gen_all": true,
                "fs": true,
                "exec": true
            },
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {
                "source_path": true,
                "prog_lang": true,
                "gen_all": true,
                "fs": true,
                "exec": true
            },
            "output_external_var": {},
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "node"
        },
        {
            "name": "parse_mr_files",
            "input_local_var": {
                "source_path": true,
                "fs": true,
                "path": true,
                "cheerio": true
            },
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {
                "source_path": true,
                "fs": true,
                "path": true,
                "cheerio": true
            },
            "output_external_var": {},
            "output_not_external_var": {
                "mr_file_paths": true
            },
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [
                {
                    "name": "find_mr_file_paths",
                    "input_local_var": {},
                    "input_not_local_var": {
                        "source_path": true,
                        "fs": true,
                        "path": true
                    },
                    "input_external_var": {},
                    "input_not_external_var": {
                        "source_path": true,
                        "fs": true,
                        "path": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {
                        "mr_files": true,
                        "mr_file_paths": true
                    },
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "split_srcode_into_lines",
                    "input_local_var": {
                        "mr_files": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {},
                    "input_not_external_var": {
                        "mr_files": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {
                        "srcodes": true
                    },
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "create_graphs",
                    "input_local_var": {
                        "srcodes": true,
                        "mr_file_paths": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {},
                    "input_not_external_var": {
                        "srcodes": true,
                        "mr_file_paths": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {
                        "graphs": true
                    },
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [
                        {
                            "name": "find_functions",
                            "input_local_var": {},
                            "input_not_local_var": {
                                "srcodes": true,
                                "mr_file_paths": true
                            },
                            "input_external_var": {},
                            "input_not_external_var": {
                                "srcodes": true,
                                "mr_file_paths": true
                            },
                            "output_external_var": {},
                            "output_not_external_var": {
                                "function_names": true
                            },
                            "output_historical_var": {},
                            "output_dynamic_var": {},
                            "set": [],
                            "type": "node"
                        },
                        {
                            "name": "find_end_points",
                            "input_local_var": {
                                "function_names": true
                            },
                            "input_not_local_var": {
                                "srcodes": true
                            },
                            "input_external_var": {},
                            "input_not_external_var": {
                                "srcodes": true,
                                "function_names": true
                            },
                            "output_external_var": {},
                            "output_not_external_var": {
                                "end_points": true
                            },
                            "output_historical_var": {},
                            "output_dynamic_var": {},
                            "set": [],
                            "type": "node"
                        },
                        {
                            "name": "path_traversal",
                            "input_local_var": {
                                "end_points": true
                            },
                            "input_not_local_var": {
                                "srcodes": true,
                                "mr_file_paths": true
                            },
                            "input_external_var": {},
                            "input_not_external_var": {
                                "end_points": true,
                                "srcodes": true,
                                "mr_file_paths": true
                            },
                            "output_external_var": {},
                            "output_not_external_var": {
                                "gpaths": true
                            },
                            "output_historical_var": {},
                            "output_dynamic_var": {},
                            "set": [],
                            "type": "node"
                        },
                        {
                            "name": "build_graph",
                            "input_local_var": {
                                "gpaths": true,
                                "function_names": true
                            },
                            "input_not_local_var": {
                                "mr_file_paths": true
                            },
                            "input_external_var": {},
                            "input_not_external_var": {
                                "gpaths": true,
                                "function_names": true,
                                "mr_file_paths": true
                            },
                            "output_external_var": {},
                            "output_not_external_var": {
                                "graphs": true
                            },
                            "output_historical_var": {},
                            "output_dynamic_var": {},
                            "set": [],
                            "type": "node"
                        }
                    ],
                    "type": "subgraph"
                },
                {
                    "name": "check_same_output_name",
                    "input_local_var": {
                        "graphs": true,
                        "mr_file_paths": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {},
                    "input_not_external_var": {
                        "graphs": true,
                        "mr_file_paths": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "check_node_properties",
                    "input_local_var": {
                        "graphs": true,
                        "mr_file_paths": true
                    },
                    "input_not_local_var": {
                        "source_path": true,
                        "fs": true,
                        "cheerio": true
                    },
                    "input_external_var": {},
                    "input_not_external_var": {
                        "source_path": true,
                        "graphs": true,
                        "mr_file_paths": true,
                        "fs": true,
                        "cheerio": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "insert_graph_content_to_xml_files",
                    "input_local_var": {
                        "graphs": true,
                        "mr_file_paths": true
                    },
                    "input_not_local_var": {
                        "fs": true,
                        "cheerio": true
                    },
                    "input_external_var": {},
                    "input_not_external_var": {
                        "graphs": true,
                        "mr_file_paths": true,
                        "fs": true,
                        "cheerio": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "insert_missing_io_tags_from_graph",
                    "input_local_var": {
                        "graphs": true,
                        "mr_file_paths": true
                    },
                    "input_not_local_var": {
                        "fs": true,
                        "cheerio": true
                    },
                    "input_external_var": {},
                    "input_not_external_var": {
                        "graphs": true,
                        "mr_file_paths": true,
                        "fs": true,
                        "cheerio": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                }
            ],
            "type": "subgraph"
        },
        {
            "name": "generate_xml_content_from_children",
            "input_local_var": {
                "source_path": true,
                "fs": true,
                "path": true
            },
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {
                "source_path": true,
                "fs": true,
                "path": true
            },
            "output_external_var": {},
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "node"
        },
        {
            "name": "check_ioputs_origins",
            "input_local_var": {
                "mr_file_paths": true,
                "fs": true,
                "cheerio": true
            },
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {
                "mr_file_paths": true,
                "fs": true,
                "cheerio": true
            },
            "output_external_var": {},
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "node"
        },
        {
            "name": "check_only_side_effects_exist",
            "input_local_var": {
                "source_path": true,
                "root_io": true,
                "fs": true,
                "cheerio": true
            },
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {
                "source_path": true,
                "root_io": true,
                "fs": true,
                "cheerio": true
            },
            "output_external_var": {},
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "node"
        },
        {
            "name": "generate_src",
            "input_local_var": {},
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {},
            "output_external_var": {},
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [
                {
                    "name": "flatten_graph",
                    "input_local_var": {},
                    "input_not_local_var": {},
                    "input_external_var": {},
                    "input_not_external_var": {},
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [
                        {
                            "name": "find_node_properties",
                            "input_local_var": {},
                            "input_not_local_var": {
                                "source_path": true,
                                "single_threaded": true,
                                "fs": true,
                                "path": true,
                                "cheerio": true
                            },
                            "input_external_var": {},
                            "input_not_external_var": {
                                "source_path": true,
                                "single_threaded": true,
                                "fs": true,
                                "path": true,
                                "cheerio": true
                            },
                            "output_external_var": {},
                            "output_not_external_var": {
                                "node_properties": true
                            },
                            "output_historical_var": {},
                            "output_dynamic_var": {},
                            "set": [],
                            "type": "node"
                        },
                        {
                            "name": "find_starting_points",
                            "input_local_var": {},
                            "input_not_local_var": {
                                "source_path": true,
                                "fs": true,
                                "path": true,
                                "cheerio": true
                            },
                            "input_external_var": {},
                            "input_not_external_var": {
                                "source_path": true,
                                "fs": true,
                                "path": true,
                                "cheerio": true
                            },
                            "output_external_var": {
                                "starting_points": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "find_starting_points"
                                    ]
                                ]
                            },
                            "output_not_external_var": {},
                            "output_historical_var": {},
                            "output_dynamic_var": {},
                            "set": [],
                            "type": "node"
                        },
                        {
                            "name": "create_flattened_graph",
                            "input_local_var": {
                                "node_properties": true,
                                "starting_points": true
                            },
                            "input_not_local_var": {
                                "source_path": true,
                                "fs": true,
                                "cheerio": true
                            },
                            "input_external_var": {},
                            "input_not_external_var": {
                                "node_properties": true,
                                "starting_points": true,
                                "source_path": true,
                                "fs": true,
                                "cheerio": true
                            },
                            "output_external_var": {
                                "flattened_graph": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "create_flattened_graph"
                                    ]
                                ]
                            },
                            "output_not_external_var": {},
                            "output_historical_var": {},
                            "output_dynamic_var": {},
                            "set": [],
                            "type": "node"
                        },
                        {
                            "name": "create_flattened_graph",
                            "input_local_var": {
                                "node_properties": true,
                                "starting_points": true
                            },
                            "input_not_local_var": {
                                "source_path": true,
                                "fs": true,
                                "cheerio": true
                            },
                            "input_external_var": {
                                "node_properties": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "create_flattened_graph"
                                    ]
                                ],
                                "starting_points": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "create_flattened_graph"
                                    ]
                                ],
                                "source_path": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "create_flattened_graph"
                                    ]
                                ],
                                "fs": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "create_flattened_graph"
                                    ]
                                ],
                                "cheerio": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "create_flattened_graph"
                                    ]
                                ]
                            },
                            "input_not_external_var": {},
                            "output_external_var": {
                                "flattened_graph": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "create_flattened_graph"
                                    ]
                                ]
                            },
                            "output_not_external_var": {},
                            "output_historical_var": {},
                            "output_dynamic_var": {},
                            "set": [],
                            "type": "node"
                        },
                        {
                            "name": "find_starting_points",
                            "input_local_var": {},
                            "input_not_local_var": {
                                "source_path": true,
                                "fs": true,
                                "path": true,
                                "cheerio": true
                            },
                            "input_external_var": {
                                "source_path": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "find_starting_points"
                                    ]
                                ],
                                "fs": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "find_starting_points"
                                    ]
                                ],
                                "path": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "find_starting_points"
                                    ]
                                ],
                                "cheerio": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "find_starting_points"
                                    ]
                                ]
                            },
                            "input_not_external_var": {},
                            "output_external_var": {
                                "starting_points": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "find_starting_points"
                                    ]
                                ]
                            },
                            "output_not_external_var": {},
                            "output_historical_var": {},
                            "output_dynamic_var": {},
                            "set": [],
                            "type": "node"
                        },
                        {
                            "name": "find_starting_points",
                            "input_local_var": {},
                            "input_not_local_var": {
                                "source_path": true,
                                "fs": true,
                                "path": true,
                                "cheerio": true
                            },
                            "input_external_var": {
                                "source_path": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "find_starting_points"
                                    ]
                                ],
                                "fs": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "find_starting_points"
                                    ]
                                ],
                                "path": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "find_starting_points"
                                    ]
                                ],
                                "cheerio": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "find_starting_points"
                                    ]
                                ]
                            },
                            "input_not_external_var": {},
                            "output_external_var": {
                                "starting_points": [
                                    [
                                        "",
                                        "generate_src",
                                        "flatten_graph",
                                        "find_starting_points"
                                    ]
                                ]
                            },
                            "output_not_external_var": {},
                            "output_historical_var": {},
                            "output_dynamic_var": {},
                            "set": [],
                            "type": "node"
                        }
                    ],
                    "type": "subgraph"
                },
                {
                    "name": "index_functions",
                    "input_local_var": {},
                    "input_not_local_var": {
                        "source_path": true,
                        "fs": true
                    },
                    "input_external_var": {},
                    "input_not_external_var": {
                        "source_path": true,
                        "fs": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {
                        "reusable": true,
                        "single_use": true,
                        "dynamic": true
                    },
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "level_graph",
                    "input_local_var": {
                        "flattened_graph": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {},
                    "input_not_external_var": {
                        "flattened_graph": true
                    },
                    "output_external_var": {
                        "leveled_graph": [
                            [
                                "",
                                "generate_src",
                                "level_graph"
                            ]
                        ]
                    },
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "find_node_historical_dep",
                    "input_local_var": {
                        "reusable": true,
                        "single_use": true,
                        "dynamic": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {},
                    "input_not_external_var": {
                        "reusable": true,
                        "single_use": true,
                        "dynamic": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "flatten_graph",
                    "input_local_var": {},
                    "input_not_local_var": {},
                    "input_external_var": {},
                    "input_not_external_var": {},
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "subgraph"
                },
                {
                    "name": "determine_subgraphs",
                    "input_local_var": {
                        "flattened_graph": true,
                        "starting_points": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {
                        "flattened_graph": [
                            [
                                "",
                                "generate_src",
                                "determine_subgraphs"
                            ]
                        ],
                        "starting_points": [
                            [
                                "",
                                "generate_src",
                                "determine_subgraphs"
                            ]
                        ]
                    },
                    "input_not_external_var": {},
                    "output_external_var": {
                        "flattened_graph_v2": [
                            [
                                "",
                                "generate_src",
                                "determine_subgraphs"
                            ]
                        ]
                    },
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "level_graph",
                    "input_local_var": {
                        "flattened_graph": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {
                        "flattened_graph": [
                            [
                                "",
                                "generate_src",
                                "level_graph"
                            ]
                        ]
                    },
                    "input_not_external_var": {},
                    "output_external_var": {
                        "leveled_graph": [
                            [
                                "",
                                "generate_src",
                                "level_graph"
                            ]
                        ]
                    },
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "determine_subgraphs",
                    "input_local_var": {
                        "flattened_graph": true,
                        "starting_points": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {
                        "flattened_graph": [
                            [
                                "",
                                "generate_src",
                                "determine_subgraphs"
                            ]
                        ],
                        "starting_points": [
                            [
                                "",
                                "generate_src",
                                "determine_subgraphs"
                            ]
                        ]
                    },
                    "input_not_external_var": {},
                    "output_external_var": {
                        "flattened_graph_v2": [
                            [
                                "",
                                "generate_src",
                                "determine_subgraphs"
                            ]
                        ]
                    },
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "level_graph",
                    "input_local_var": {
                        "flattened_graph": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {
                        "flattened_graph": [
                            [
                                "",
                                "generate_src",
                                "level_graph"
                            ]
                        ]
                    },
                    "input_not_external_var": {},
                    "output_external_var": {},
                    "output_not_external_var": {
                        "leveled_graph": true
                    },
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "flatten_graph",
                    "input_local_var": {},
                    "input_not_local_var": {},
                    "input_external_var": {},
                    "input_not_external_var": {},
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "subgraph"
                },
                {
                    "name": "determine_subgraphs",
                    "input_local_var": {
                        "flattened_graph": true,
                        "starting_points": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {
                        "flattened_graph": [
                            [
                                "",
                                "generate_src",
                                "determine_subgraphs"
                            ]
                        ],
                        "starting_points": [
                            [
                                "",
                                "generate_src",
                                "determine_subgraphs"
                            ]
                        ]
                    },
                    "input_not_external_var": {},
                    "output_external_var": {},
                    "output_not_external_var": {
                        "flattened_graph_v2": true
                    },
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "determine_subgraph_order_str_points",
                    "input_local_var": {
                        "flattened_graph_v2": true,
                        "starting_points": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {
                        "flattened_graph_v2": [
                            [
                                "",
                                "generate_src",
                                "determine_subgraph_order_str_points"
                            ]
                        ],
                        "starting_points": [
                            [
                                "",
                                "generate_src",
                                "determine_subgraph_order_str_points"
                            ]
                        ]
                    },
                    "input_not_external_var": {},
                    "output_external_var": {},
                    "output_not_external_var": {
                        "thread_starting_points": true,
                        "flattened_graph_v3": true
                    },
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "merge_serial_subgraphs",
                    "input_local_var": {
                        "thread_starting_points": true,
                        "flattened_graph_v3": true,
                        "starting_points": true
                    },
                    "input_not_local_var": {},
                    "input_external_var": {
                        "starting_points": [
                            [
                                "",
                                "generate_src",
                                "merge_serial_subgraphs"
                            ]
                        ]
                    },
                    "input_not_external_var": {
                        "thread_starting_points": true,
                        "flattened_graph_v3": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {
                        "flattened_graph_v4": true,
                        "thread_starting_points_v2": true
                    },
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [],
                    "type": "node"
                },
                {
                    "name": "generate_src",
                    "input_local_var": {
                        "flattened_graph_v4": true,
                        "thread_starting_points_v2": true,
                        "leveled_graph": true,
                        "starting_points": true
                    },
                    "input_not_local_var": {
                        "source_path": true,
                        "prog_lang": true,
                        "path": true
                    },
                    "input_external_var": {
                        "leveled_graph": [
                            [
                                "",
                                "generate_src",
                                "generate_src"
                            ]
                        ],
                        "starting_points": [
                            [
                                "",
                                "generate_src",
                                "generate_src"
                            ]
                        ],
                        "source_path": [
                            [
                                "",
                                "generate_src",
                                "generate_src"
                            ]
                        ],
                        "prog_lang": [
                            [
                                "",
                                "generate_src",
                                "generate_src"
                            ]
                        ],
                        "path": [
                            [
                                "",
                                "generate_src",
                                "generate_src"
                            ]
                        ]
                    },
                    "input_not_external_var": {
                        "flattened_graph_v4": true,
                        "thread_starting_points_v2": true
                    },
                    "output_external_var": {},
                    "output_not_external_var": {},
                    "output_historical_var": {},
                    "output_dynamic_var": {},
                    "set": [
                        {
                            "name": "generate_src",
                            "input_local_var": {
                                "flattened_graph_v4": true,
                                "thread_starting_points_v2": true,
                                "leveled_graph": true,
                                "starting_points": true
                            },
                            "input_not_local_var": {
                                "source_path": true,
                                "prog_lang": true,
                                "path": true
                            },
                            "input_external_var": {
                                "leveled_graph": [
                                    [
                                        "",
                                        "generate_src",
                                        "generate_src"
                                    ]
                                ],
                                "starting_points": [
                                    [
                                        "",
                                        "generate_src",
                                        "generate_src"
                                    ]
                                ],
                                "source_path": [
                                    [
                                        "",
                                        "generate_src",
                                        "generate_src"
                                    ]
                                ],
                                "prog_lang": [
                                    [
                                        "",
                                        "generate_src",
                                        "generate_src"
                                    ]
                                ],
                                "path": [
                                    [
                                        "",
                                        "generate_src",
                                        "generate_src"
                                    ]
                                ]
                            },
                            "input_not_external_var": {
                                "flattened_graph_v4": true,
                                "thread_starting_points_v2": true
                            },
                            "output_external_var": {},
                            "output_not_external_var": {},
                            "output_historical_var": {},
                            "output_dynamic_var": {},
                            "set": [],
                            "type": "node"
                        }
                    ],
                    "type": "node"
                }
            ],
            "type": "subgraph"
        },
        {
            "name": "generate_src",
            "input_local_var": {},
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {},
            "output_external_var": {},
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "subgraph"
        },
        {
            "name": "generate_src",
            "input_local_var": {},
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {},
            "output_external_var": {},
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "subgraph"
        },
        {
            "name": "main",
            "input_local_var": {},
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {},
            "output_external_var": {
                "source_path": [
                    [
                        "",
                        "main"
                    ]
                ],
                "prog_lang": [
                    [
                        "",
                        "main"
                    ]
                ],
                "root_io": [
                    [
                        "",
                        "main"
                    ]
                ],
                "gen_all": [
                    [
                        "",
                        "main"
                    ]
                ],
                "single_threaded": [
                    [
                        "",
                        "main"
                    ]
                ]
            },
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "node"
        },
        {
            "name": "generate_src",
            "input_local_var": {},
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {},
            "output_external_var": {},
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "subgraph"
        },
        {
            "name": "module_dependencies",
            "input_local_var": {},
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {},
            "output_external_var": {
                "fs": [
                    [
                        "",
                        "module_dependencies"
                    ]
                ],
                "exec": [
                    [
                        "",
                        "module_dependencies"
                    ]
                ],
                "path": [
                    [
                        "",
                        "module_dependencies"
                    ]
                ],
                "cheerio": [
                    [
                        "",
                        "module_dependencies"
                    ]
                ]
            },
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "node"
        },
        {
            "name": "generate_src",
            "input_local_var": {},
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {},
            "output_external_var": {},
            "output_not_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "set": [],
            "type": "subgraph"
        }
    ],
    "type": "subgraph"
}
