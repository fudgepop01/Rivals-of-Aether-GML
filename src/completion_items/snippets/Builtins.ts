import {
  CompletionItemKind, CompletionItem, InsertTextFormat
} from 'vscode-languageserver';

const data =
`script_execute(\${1:script/index}, \${2:...args})
script_get_name(\${1:script/index})
script_get_index(\${1:script_name/string})
is_real(\${1:v})
is_int32(\${1:v})
is_int64(\${1:v})
is_bool(\${1:v})
is_number(\${1:v})
is_string(\${1:v})
is_array(\${1:v})
is_object(\${1:v})
abs(\${1:x/number})
round(\${1:x/number})
floor(\${1:x/number})
ceil(\${1:x/number})
sign(\${1:x/number})
frac(\${1:x/number})
sqrt(\${1:x/number})
sqr(\${1:x/number})
exp(\${1:x/number})
ln(\${1:x/number})
log2(\${1:x/number})
log10(\${1:x/number})
logn(\${1:n/number}, \${2:x/number})
sin(\${1:x/number})
cos(\${1:x/number})
tan(\${1:x/number})
arcsin(\${1:x/number})
arccos(\${1:x/number})
arctan(\${1:x/number})
arctan2(\${1:y/number}, \${2:x/number})
dsin(\${1:x/number})
dcos(\${1:x/number})
dtan(\${1:x/number})
darcsin(\${1:x/number})
darccos(\${1:x/number})
darctan(\${1:x/number})
darctan2(\${1:y/number}, \${2:x/number})
degtorad(\${1:x/number})
radtodeg(\${1:x/number})
min(\${1:...})
max(\${1:...})
clamp(\${1:v/number}, \${2:min/number}, \${3:max/number})
lerp(\${1:v1/number}, \${2:v2/number}, \${3:amt/number})
dot_product(\${1:x1/number}, \${2:y1/number}, \${3:x2/number}, \${4:y2/number})
angle_difference(\${1:src/number}, \${2:dst/number})
point_distance(\${1:x1/number}, \${2:y1/number}, \${3:x2/number}, \${4:y2/number})
point_direction(\${1:x1/number}, \${2:y1/number}, \${3:x2/number}, \${4:y2/number})
lengthdir_x(\${1:len/number}, \${2:dir/number})
lengthdir_y(\${1:len/number}, \${2:dir/number})
real(\${1:val})
bool(\${1:val})
string(\${1:val})
string_format(\${1:val/number}, \${2:tot/int}, \${3:dec/int})
chr(\${1:c/int})
string_length(\${1:s/string})
string_pos(\${1:sub/string}, \${2:s/string})
string_count(\${1:sub/string}, \${2:s/string})
string_copy(\${1:s/string}, \${2:index/int}, \${3:count/int})
string_delete(\${1:s/string}, \${2:index/int}, \${3:count/int})
string_char_at(\${1:s/string}, \${2:index/int})
string_ord_at(\${1:s/string}, \${2:index/int})
string_upper(\${1:s/string})
string_lower(\${1:s/string})
string_letters(\${1:s/string})
string_digits(\${1:s/string})
string_lettersdigits(\${1:s/string})
string_replace(\${1:s/string}, \${2:what/string}, \${3:by/string})
string_replace_all(\${1:s/string}, \${2:what/string}, \${3:by/string})
array_create(\${1:size/int}, \${2:val=0})
array_clear(\${1:arr/array}, \${2:val})
array_clone(\${1:arr/array})
array_slice(\${1:arr/array}, \${2:start/int}, \${3:length/int})
array_copy(\${1:dest/array}, \${2:dest_index/int}, \${3:source/array}, \${4:source_index/int}, \${5:length/int})
array_length(\${1:val})
array_equals(\${1:a/array}, \${2:b/array})
array_push(\${1:arr}, \${2:val})
array_insert(\${1:arr/array}, \${2:pos/int}, \${3:val})
array_find_index(\${1:arr/array}, \${2:val})
array_find_index_ext(\${1:arr/array}, \${2:val}, \${3:start/int})
array_find_last_index(\${1:arr/array}, \${2:val})
array_find_last_index_ext(\${1:arr/array}, \${2:val}, \${3:start/int})
array_sort(\${1:arr/array}, \${2:ascend/bool})
array_sort_sub(\${1:arr/array}, \${2:sub_index/int}, \${3:ascend/bool})
array_join(\${1:/array}, \${2:/string})
ds_list_create()
ds_list_destroy(\${1:list})
ds_list_valid(\${1:list})
ds_list_clear(\${1:list}
ds_list_size(\${1:list})
ds_list_shuffle(\${1:list})
ds_list_find_value(\${1:list}, \${2:index/int})
ds_list_set(\${1:list}, \${2:index/int}, \${3:val})
ds_list_add(\${1:list}, \${2:...values})
ds_list_add_array(\${1:list}, \${2:array/array})
ds_list_insert(\${1:list}, \${2:index/int}, \${3:val})
ds_list_delete(\${1:list}, \${2:index/int})
ds_list_find_index(\${1:list}, \${2:val})
ds_list_remove(\${1:list}, \${2:val})
ds_list_join(\${1:list}, \${2:sep/string})
ds_list_to_array(\${1:list})
ds_map_create()
ds_map_destroy(\${1:map})
ds_map_valid(\${1:map})
ds_map_clear(\${1:map})
ds_map_size(\${1:map})
ds_map_keys(\${1:map})
ds_map_values(\${1:map})
ds_map_find_value(\${1:map}, \${2:key})
ds_map_set(\${1:map}, \${2:key}, \${3:val})
ds_map_exists(\${1:map}, \${2:key})
ds_map_delete(\${1:map}, \${2:key})
ds_grid_create(\${1:w/int}, \${2:h/int})
ds_grid_destroy(\${1:grid})
ds_grid_valid(\${1:grid})
ds_grid_clear(\${1:grid}, \${2:val})
ds_grid_width(\${1:grid})
ds_grid_height(\${1:grid})
ds_grid_resize(\${1:grid}, \${2:w/int}, \${3:h/int})
ds_grid_get(\${1:grid}, \${2:x/number}, \${3:y/number})
ds_grid_set(\${1:grid}, \${2:x/number}, \${3:y/number}, \${4:val})
ds_grid_set_region(\${1:grid}, \${2:x1/number}, \${3:y1/number}, \${4:x2/number}, \${5:y2/number}, \${6:val})
ds_grid_sort(\${1:grid}, \${2:column/int}, \${3:ascending/bool})
vertex_create_buffer()
vertex_create_buffer_ext(\${1:size/int})
vertex_delete_buffer(\${1:vbuf})
vertex_begin(\${1:vbuf}, \${2:vfmt})
vertex_float1(\${1:vbuf}, \${2:v1/number})
vertex_float2(\${1:vbuf}, \${2:v1/number}, \${3:v2/number})
vertex_float3(\${1:vbuf}, \${2:v1/number}, \${3:v2/number}, \${4:v3/number})
vertex_float4(\${1:vbuf}, \${2:v1/number}, \${3:v2/number}, \${4:v3/number}, \${5:v4/number})
vertex_color(\${1:vbuf}, \${2:c/int}, \${3:a/number})
vertex_colour(\${1:vbuf}, \${2:c/int}, \${3:a/number})
vertex_texcoord(\${1:vbuf}, \${2:tx/number}, \${3:ty/number})
vertex_position(\${1:vbuf}, \${2:x/number}, \${3:y/number})
vertex_position_3d(\${1:vbuf}, \${2:x/number}, \${3:y/number}, \${4:z/number})
vertex_normal(\${1:vbuf}, \${2:nx/number}, \${3:ny/number}, \${4:nz/number})
vertex_argb(\${1:vbuf}, \${2:v/int})
vertex_end(\${1:vbuf})
vertex_get_buffer_size(\${1:vbuf})
vertex_get_number(\${1:vbuf})
vertex_freeze(\${1:vbuf})
vertex_submit(\${1:vbuf}, \${2:prType/int}, \${3:tex=Texture.defValue})
vertex_format_begin()
vertex_format_end()
vertex_format_delete(\${1:vfmt})
vertex_format_add_color()
vertex_format_add_colour()
vertex_format_add_normal()
vertex_format_add_position()
vertex_format_add_position_3d()
vertex_format_add_texcoord()
vertex_format_add_custom(\${1:type/int}, \${2:usage/int})
variable_instance_exists(\${1:inst}, \${2:varname/string})
variable_instance_get(\${1:inst}, \${2:varname/string}, \${3:?defvalue})
variable_instance_set(\${1:inst}, \${2:varname/string}, \${3:value})
variable_instance_get_names(\${1:inst}, \${2:?outList})
sprite_add_base64(\${1:b64/string}, \${2:num/int}, \${3:xo/number}, \${4:yo/number})
sprite_exists(\${1:ind})
sprite_get_name(\${1:ind})
sprite_get_number(\${1:ind})
sprite_get_width(\${1:ind})
sprite_get_height(\${1:ind})
sprite_get_xoffset(\${1:ind})
sprite_get_yoffset(\${1:ind})
sprite_get_bbox_mode(\${1:ind})
sprite_get_bbox_left(\${1:ind})
sprite_get_bbox_right(\${1:ind})
sprite_get_bbox_top(\${1:ind})
sprite_get_bbox_bottom(\${1:ind})
instance_find(\${1:obj/id}, \${2:ind/int})
instance_number(\${1:obj/id})
instance_exists(\${1:/id})
instance_position(\${1:x/number}, \${2:y/number}, \${3:obj/id}
instance_place(\${1:x/number}, \${2:y/number}, \${3:obj/id})
instance_nearest(\${1:x/number}, \${2:y/number}, \${3:obj/id})
instance_furthest(\${1:x/number}, \${2:y/number}, \${3:obj/id})
motion_set(\${1:dir/number}, \${2:speed/number})
motion_add(\${1:dir/number}, \${2:speed/number})
place_free(\${1:x/number}, \${2:y/number})
place_empty(\${1:x/number}, \${2:y/number})
place_meeting(\${1:x/number}, \${2:y/number}, \${3:obj/index})
place_snapped(\${1:hsnap/number}, \${2:vsnap/number})
move_random(\${1:hsnap/number}, \${2:vsnap/number})
move_snap(\${1:hsnap/number}, \${2:vsnap/number})
move_towards_point(\${1:x/number}, \${2:y/number}, \${3:sp/number})
move_contact_solid(\${1:dir/number}, \${2:maxdist/number})
move_contact_all(\${1:dir/number}, \${2:maxdist/number})
move_outside_solid(\${1:dir/number}, \${2:maxdist/number})
move_outside_all(\${1:dir/number}, \${2:maxdist/number})
move_bounce_solid(\${1:advanced/bool})
move_bounce_all(\${1:advanced/bool})
move_wrap(\${1:hor/bool}, \${2:vert/bool}, \${3:margin/number})
distance_to_point(\${1:x/number}, \${2:y/number})
distance_to_object(\${1:obj/index})
position_empty(\${1:x/number}, \${2:y/number})
position_meeting(\${1:x/number}, \${2:y/number}, \${3:obj/index})
mp_linear_step(\${1:x/number}, \${2:y/number}, \${3:speed/number}, \${4:checkall/bool})
mp_potential_step(\${1:x/number}, \${2:y/number}, \${3:speed/number}, \${4:checkall/bool})
mp_linear_step_object(\${1:x/number}, \${2:y/number}, \${3:speed/number}, \${4:obj/index})
mp_potential_step_object(\${1:x/number}, \${2:y/number}, \${3:speed/number}, \${4:obj/index})
collision_point(\${1:x/number}, \${2:y/number}, \${3:obj/id}, \${4:prec/bool}, \${5:notme/bool})
collision_rectangle(\${1:x1/number}, \${2:y1/number}, \${3:x2/number}, \${4:y2/number}, \${5:obj/id}, \${6:prec/bool}, \${7:notme/bool})
collision_circle(\${1:x1/number}, \${2:y1/number}, \${3:radius}, \${4:obj/id}, \${5:prec/bool}, \${6:notme/bool})
collision_ellipse(\${1:x1/number}, \${2:y1/number}, \${3:x2/number}, \${4:y2/number}, \${5:obj/id}, \${6:prec/bool}, \${7:notme/bool})
collision_line(\${1:x1/number}, \${2:y1/number}, \${3:x2/number}, \${4:y2/number}, \${5:obj/id}, \${6:prec/bool}, \${7:notme/bool})
draw_set_colour(\${1:/color})
draw_set_color(\${1:/color})
draw_set_alpha(\${1:alpha/number})
draw_get_colour()
draw_get_color()
draw_get_alpha()
c_aqua = 16776960
c_black = 0
c_blue = 16711680
c_dkgray = 4210752
c_fuchsia = 16711935
c_gray = 8421504
c_green = 32768
c_lime = 65280
c_ltgray = 12632256
c_maroon = 128
c_navy = 8388608
c_olive = 32896
c_purple = 8388736
c_red = 255
c_silver = 12632256
c_teal = 8421376
c_white = 16777215
c_yellow = 65535
c_orange = 4235519
merge_colour(\${1:col1/number}, \${2:col2/number}, \${3:amount/number})
make_colour_rgb(\${1:red/number}, \${2:green/number}, \${3:blue/number})
make_colour_hsv(\${1:hue/number}, \${2:saturation/number}, \${3:value/number})
colour_get_red(\${1:/color})
colour_get_green(\${1:/color})
colour_get_blue(\${1:/color})
colour_get_hue(\${1:/color})
colour_get_saturation(\${1:/color})
colour_get_value(\${1:/color})
merge_colour(\${1:col1/color}, \${2:col2/color}, \${3:amount/number})
make_color_rgb(\${1:red/number}, \${2:green/number}, \${3:blue/number})
make_color_hsv(\${1:hue/number}, \${2:saturation/number}, \${3:value/number})
color_get_red(\${1:/color})
color_get_green(\${1:/color})
color_get_blue(\${1:/color})
color_get_hue(\${1:/color})
color_get_saturation(\${1:/color})
color_get_value(\${1:/color})
merge_color(\${1:/color}, \${2:/color}, \${3:amount/number})
draw_set_font(\${1:/font})
draw_get_font()
draw_set_halign(\${1:halign/int})
draw_get_halign()
draw_set_valign(\${1:valign/int})
draw_get_valign()
fa_left = 0
fa_center = 1
fa_right = 2
fa_top = 0
fa_middle = 1
fa_bottom = 2
string_width(\${1:/string})
string_height(\${1:/string})
string_width_ext(\${1:/string}, \${2:sep/number}, \${3:w/number})
string_height_ext(\${1:/string}, \${2:sep/number}, \${3:w/number})
draw_text_transformed(\${1:x}, \${2:y}, \${3:string}, \${4:xscale}, \${5:yscale}, \${6:angle})
draw_text_ext_transformed(\${1:x}, \${2:y}, \${3:string}, \${4:sep}, \${5:w}, \${6:xscale}, \${7:yscale}, \${8:angle})
draw_text_colour(\${1:x}, \${2:y}, \${3:string}, \${4:c1}, \${5:c2}, \${6:c3}, \${7:c4}, \${8:alpha})
draw_text_ext_colour(\${1:x}, \${2:y}, \${3:string}, \${4:sep}, \${5:w}, \${6:c1}, \${7:c2}, \${8:c3}, \${9:c4}, \${10:alpha})
draw_text_transformed_colour(\${1:x}, \${2:y}, \${3:string}, \${4:xscale}, \${5:yscale}, \${6:angle}, \${7:c1}, \${8:c2}, \${9:c3}, \${10:c4}, \${11:alpha})
draw_text_ext_transformed_colour(\${1:x}, \${2:y}, \${3:string}, \${4:sep}, \${5:w}, \${6:xscale}, \${7:yscale}, \${8:angle}, \${9:c1}, \${10:c2}, \${11:c3}, \${12:c4}, \${13:alpha})
draw_text_color(\${1:x}, \${2:y}, \${3:string}, \${4:c1}, \${5:c2}, \${6:c3}, \${7:c4}, \${8:alpha})
draw_text_ext_color(\${1:x}, \${2:y}, \${3:string}, \${4:sep}, \${5:w}, \${6:c1}, \${7:c2}, \${8:c3}, \${9:c4}, \${10:alpha})
draw_text_transformed_color(\${1:x}, \${2:y}, \${3:string}, \${4:xscale}, \${5:yscale}, \${6:angle}, \${7:c1}, \${8:c2}, \${9:c3}, \${10:c4}, \${11:alpha})
draw_text_ext_transformed_color(\${1:x}, \${2:y}, \${3:string}, \${4:sep}, \${5:w}, \${6:xscale}, \${7:yscale}, \${8:angle}, \${9:c1}, \${10:c2}, \${11:c3}, \${12:c4}, \${13:alpha})
draw_point_colour(\${1:x}, \${2:y}, \${3:col1})
draw_line_colour(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:col1}, \${6:col2})
draw_line_width_colour(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:w}, \${6:col1}, \${7:col2})
draw_rectangle_colour(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:col1}, \${6:col2}, \${7:col3}, \${8:col4}, \${9:outline})
draw_roundrect_colour(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:col1}, \${6:col2}, \${7:outline})
draw_roundrect_colour_ext(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:radiusx}, \${6:radiusy}, \${7:col1}, \${8:col2}, \${9:outline})
draw_triangle_colour(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:x3}, \${6:y3}, \${7:col1}, \${8:col2}, \${9:col3}, \${10:outline})
draw_circle_colour(\${1:x}, \${2:y}, \${3:r}, \${4:col1}, \${5:col2}, \${6:outline})
draw_ellipse_colour(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:col1}, \${6:col2}, \${7:outline})
draw_point_color(\${1:x}, \${2:y}, \${3:col1})
draw_line_color(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:col1}, \${6:col2})
draw_line_width_color(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:w}, \${6:col1}, \${7:col2})
draw_rectangle_color(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:col1}, \${6:col2}, \${7:col3}, \${8:col4}, \${9:outline})
draw_roundrect_color(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:col1}, \${6:col2}, \${7:outline})
draw_roundrect_color_ext(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:radiusx}, \${6:radiusy}, \${7:col1}, \${8:col2}, \${9:outline})
draw_triangle_color(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:x3}, \${6:y3}, \${7:col1}, \${8:col2}, \${9:col3}, \${10:outline})
draw_circle_color(\${1:x}, \${2:y}, \${3:r}, \${4:col1}, \${5:col2}, \${6:outline})
draw_ellipse_color(\${1:x1}, \${2:y1}, \${3:x2}, \${4:y2}, \${5:col1}, \${6:col2}, \${7:outline})
pr_pointlist = 1
pr_linelist = 2
pr_linestrip = 3
pr_trianglelist = 4
pr_trianglestrip = 5
pr_trianglefan = 6
draw_primitive_begin(\${1:kind})
draw_vertex(\${1:x}, \${2:y})
draw_vertex_colour(\${1:x}, \${2:y}, \${3:col}, \${4:alpha})
draw_vertex_color(\${1:x}, \${2:y}, \${3:col}, \${4:alpha})
draw_primitive_end()
sprite_get_uvs(\${1:spr}, \${2:subimg})
font_get_uvs(\${1:font})
sprite_get_texture(\${1:spr}, \${2:subimg})
font_get_texture(\${1:font})
texture_get_width(\${1:texid})
texture_get_height(\${1:texid})
texture_get_uvs(\${1:texid})
draw_primitive_begin_texture(\${1:kind}, \${2:texid})
draw_vertex_texture(\${1:x}, \${2:y}, \${3:xtex}, \${4:ytex})
draw_vertex_texture_colour(\${1:x}, \${2:y}, \${3:xtex}, \${4:ytex}, \${5:col}, \${6:alpha})
draw_vertex_texture_color(\${1:x}, \${2:y}, \${3:xtex}, \${4:ytex}, \${5:col}, \${6:alpha})
texture_global_scale(\${1:pow2integer})
bm_normal = 0
bm_add = 1
bm_max = 2
bm_subtract = 3
bm_zero = 1
bm_one = 2
bm_src_colour = 3
bm_inv_src_colour = 4
bm_src_color = 3
bm_inv_src_color = 4
bm_src_alpha = 5
bm_inv_src_alpha = 6
bm_dest_alpha = 7
bm_inv_dest_alpha = 8
bm_dest_colour = 9
bm_inv_dest_colour = 10
bm_dest_color = 9
bm_inv_dest_color = 10
bm_src_alpha_sat = 11
tf_point = 0
tf_linear = 1
tf_anisotropic = 2
mip_off = 0
mip_on = 1
mip_markedonly = 2
cmpfunc_never = 1
cmpfunc_less = 2
cmpfunc_equal = 3
cmpfunc_lessequal = 4
cmpfunc_greater = 5
cmpfunc_notequal = 6
cmpfunc_greaterequal = 7
cmpfunc_always = 8
cull_noculling = 0
cull_clockwise = 1
cull_counterclockwise = 2
lighttype_dir = 0
lighttype_point = 1
gpu_set_blendenable(\${1:enable})
gpu_set_ztestenable(\${1:enable})
gpu_set_zfunc(\${1:cmp_func})
gpu_set_zwriteenable(\${1:enable})
gpu_set_fog(\${1:enable}, \${2:col}, \${3:start}, \${4:end})
gpu_set_cullmode(\${1:cullmode})
gpu_set_blendmode(\${1:mode})
gpu_set_blendmode_ext(\${1:src}, \${2:dest})
gpu_set_blendmode_ext_sepalpha(\${1:src}, \${2:dest}, \${3:srcalpha}, \${4:destalpha})
gpu_set_colorwriteenable(\${1:red}, \${2:green}, \${3:blue}, \${4:alpha})
gpu_set_colourwriteenable(\${1:red}, \${2:green}, \${3:blue}, \${4:alpha})
gpu_set_alphatestenable(\${1:enable})
gpu_set_alphatestref(\${1:value})
gpu_set_alphatestfunc(\${1:cmp_func})
gpu_set_texfilter(\${1:linear})
gpu_set_texfilter_ext(\${1:sampler_id}, \${2:linear})
gpu_set_texrepeat(\${1:repeat})
gpu_set_texrepeat_ext(\${1:sampler_id}, \${2:repeat})
gpu_set_tex_filter(\${1:linear})
gpu_set_tex_filter_ext(\${1:sampler_id}, \${2:linear})
gpu_set_tex_repeat(\${1:repeat})
gpu_set_tex_repeat_ext(\${1:sampler_id}, \${2:repeat})
gpu_set_tex_mip_filter(\${1:filter})
gpu_set_tex_mip_filter_ext(\${1:sampler_id}, \${2:filter})
gpu_set_tex_mip_bias(\${1:bias})
gpu_set_tex_mip_bias_ext(\${1:sampler_id}, \${2:bias})
gpu_set_tex_min_mip(\${1:minmip})
gpu_set_tex_min_mip_ext(\${1:sampler_id}, \${2:minmip})
gpu_set_tex_max_mip(\${1:maxmip})
gpu_set_tex_max_mip_ext(\${1:sampler_id}, \${2:maxmip})
gpu_set_tex_max_aniso(\${1:maxaniso})
gpu_set_tex_max_aniso_ext(\${1:sampler_id}, \${2:maxaniso})
gpu_set_tex_mip_enable(\${1:setting})
gpu_set_tex_mip_enable_ext(\${1:sampler_id}, \${2:setting})
gpu_get_blendenable()
gpu_get_ztestenable()
gpu_get_zfunc()
gpu_get_zwriteenable()
gpu_get_fog()
gpu_get_cullmode()
gpu_get_blendmode()
gpu_get_blendmode_ext()
gpu_get_blendmode_ext_sepalpha()
gpu_get_blendmode_src()
gpu_get_blendmode_dest()
gpu_get_blendmode_srcalpha()
gpu_get_blendmode_destalpha()
gpu_get_colorwriteenable()
gpu_get_colourwriteenable()
gpu_get_alphatestenable()
gpu_get_alphatestref()
gpu_get_alphatestfunc()
gpu_get_texfilter()
gpu_get_texfilter_ext(\${1:sampler_id})
gpu_get_texrepeat()
gpu_get_texrepeat_ext(\${1:sampler_id})
gpu_get_tex_filter()
gpu_get_tex_filter_ext(\${1:sampler_id})
gpu_get_tex_repeat()
gpu_get_tex_repeat_ext(\${1:sampler_id})
gpu_get_tex_mip_filter()
gpu_get_tex_mip_filter_ext(\${1:sampler_id})
gpu_get_tex_mip_bias()
gpu_get_tex_mip_bias_ext(\${1:sampler_id})
gpu_get_tex_min_mip()
gpu_get_tex_min_mip_ext(\${1:sampler_id})
gpu_get_tex_max_mip()
gpu_get_tex_max_mip_ext(\${1:sampler_id})
gpu_get_tex_max_aniso()
gpu_get_tex_max_aniso_ext(\${1:sampler_id})
gpu_get_tex_mip_enable()
gpu_get_tex_mip_enable_ext(\${1:sampler_id})
gpu_push_state()
gpu_pop_state()
draw_light_define_ambient(\${1:col})
draw_light_define_direction(\${1:ind}, \${2:dx}, \${3:dy}, \${4:dz}, \${5:col})
draw_light_define_point(\${1:ind}, \${2:x}, \${3:y}, \${4:z}, \${5:range}, \${6:col})
draw_light_enable(\${1:ind}, \${2:enable})
draw_set_lighting(\${1:enable})
draw_light_get_ambient()
draw_light_get(\${1:ind})
draw_get_lighting()/
draw_self()
draw_sprite(\${1:sprite/id}, \${2:subimg/number}, \${3:x/number}, \${4:y/number})
draw_sprite_pos(\${1:sprite/id}, \${2:subimg/number}, \${3:x1/number}, \${4:y1/number}, \${5:x2/number}, \${6:y2/number}, \${7:x3/number}, \${8:y3/number}, \${9:x4/number}, \${10:y4/number}, \${11:alpha/number})
draw_sprite_ext(\${1:sprite/id}, \${2:subimg/number}, \${3:x/number}, \${4:y/number}, \${5:xscale/number}, \${6:yscale/number}, \${7:rot/number}, \${8:col/number}, \${9:alpha/number})
draw_sprite_stretched(\${1:sprite/id}, \${2:subimg/number}, \${3:x/number}, \${4:y/number}, \${5:w/number}, \${6:h/number})
draw_sprite_stretched_ext(\${1:sprite/id}, \${2:subimg/number}, \${3:x/number}, \${4:y/number}, \${5:w/number}, \${6:h/number}, \${7:col/number}, \${8:alpha/number})
draw_sprite_tiled(\${1:sprite/id}, \${2:subimg/number}, \${3:x/number}, \${4:y/number})
draw_sprite_tiled_ext(\${1:sprite/id}, \${2:subimg/number}, \${3:x/number}, \${4:y/number}, \${5:xscale/number}, \${6:yscale/number}, \${7:col/number}, \${8:alpha/number})
draw_sprite_part(\${1:sprite/id}, \${2:subimg/number}, \${3:left}, \${4:top}, \${5:w/number}, \${6:h/number}, \${7:x/number}, \${8:y/number})
draw_sprite_part_ext(\${1:sprite/id}, \${2:subimg/number}, \${3:left}, \${4:top}, \${5:w/number}, \${6:h/number}, \${7:x/number}, \${8:y/number}, \${9:xscale/number}, \${10:yscale/number}, \${11:col/number}, \${12:alpha/number})
draw_sprite_general(\${1:sprite/id}, \${2:subimg/number}, \${3:left}, \${4:top}, \${5:w/number}, \${6:h/number}, \${7:x/number}, \${8:y/number}, \${9:xscale/number}, \${10:yscale/number}, \${11:rot/number}, \${12:c1/color}, \${13:c2/color}, \${14:c3/color}, \${15:c4/color}, \${16:alpha/number})
trace(\${1:...values})
sprite_get(\${1:v/string})
sound_get(\${1:v/string})
sprite_change_offset(\${1:spr/string}, \${2:xoff/int}, \${3:yoff/int})
asset_get(\${1:asset/string})
instance_create(\${1:x/int}, \${2:y/int}, \${3:obj/string})
instance_destroy(\${1:...values})
sprite_change_collision_mask(\${1:sprite/string}, \${2:sepmasks/int}, \${3:bboxmode/int}, \${4:bbleft/int}, \${5:bbtop/int}, \${6:bbright/int}, \${7:bbbottom/int}, \${8:kind/int})
tween(\${1:ease}, \${2:start/int}, \${3:end/int}, \${4:current_time/int}, \${5:total_time/int}, \${6:...values})`

export default (): CompletionItem[] => {
  return [
    ...data.split('\n').map((v) => {
      if (v.includes('(')) {
        return {
          label: v.substring(0, v.indexOf('(')),
          kind: CompletionItemKind.Function,
          documentation: '',
          insertText: v,
          insertTextFormat: InsertTextFormat.Snippet
        }
      } else {
        return {
          label: v.substring(0, v.indexOf(' ')),
          kind: CompletionItemKind.Constant,
          documentation: v,
          insertText: v.substring(0, v.indexOf(' '))
        }
      }
    }),
  ]
}