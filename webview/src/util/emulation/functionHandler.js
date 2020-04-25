import seedRandom from 'seedrandom';

import { get } from 'svelte/store';
import { timeline as TL } from '../../store/gameState';

import constants, { reverseLookup } from './constantLookup';
import getData, { nodeTypes } from './instructions';
import currentItems from './currentItems';

const getAttackTarget = (gameState, scriptName, attack) => {
  gameState.helpers.ensureAttack(attack);
  const attacks = gameState.instances.self.attacks;
  const target = (scriptName === attack.substring(3).toLowerCase()) ?
    attacks[attack].initial
    : attacks[attack].modified;

  return target;
}

const functions = (gameState) => {
  const scriptName = currentItems.scriptName;

  return {
    script_execute(script, ...args){},
    script_get_name(script){},
    script_get_index(script_name){},
    is_real(v){},
    is_int32(v){},
    is_int64(v){},
    is_bool(v){},
    is_number(v){},
    is_string(v){},
    is_array(v){},
    is_object(v){},
    abs(x){},
    round(x){},
    floor(x){},
    ceil(x){},
    sign(x){},
    frac(x){},
    sqrt(x){},
    sqr(x){},
    exp(x){},
    ln(x){},
    log2(x){},
    log10(x){},
    logn(n, x){},
    sin(x){},
    cos(x){},
    tan(x){},
    arcsin(x){},
    arccos(x){},
    arctan(x){},
    arctan2(y, x){},
    dsin(x){},
    dcos(x){},
    dtan(x){},
    darcsin(x){},
    darccos(x){},
    darctan(x){},
    darctan2(y, x){},
    degtorad(x){},
    radtodeg(x){},
    min(...values){},
    max(...values){},
    clamp(v, min, max){},
    lerp(v1, v2, amt){},
    dot_product(x1, y1, x2, y2){},
    angle_difference(src, dst){},
    point_distance(x1, y1, x2, y2){},
    point_direction(x1, y1, x2, y2){},
    lengthdir_x(len, dir){},
    lengthdir_y(len, dir){},
    real(val){},
    bool(val){},
    string(val){},
    string_format(val, tot, dec){},
    chr(c){},
    string_length(s){},
    string_pos(sub, s){},
    string_count(sub, s){},
    string_copy(s, index, count){},
    string_delete(s, index, count){},
    string_char_at(s, index){},
    string_ord_at(s, index){},
    string_upper(s){},
    string_lower(s){},
    string_letters(s){},
    string_digits(s){},
    string_lettersdigits(s){},
    string_replace(s, what, by){},
    string_replace_all(s, what, by){},
    array_create(size, val=0){},
    array_clear(arr, val){},
    array_clone(arr){},
    array_slice(arr, start, length){},
    array_copy(dest, dest_index, source, source_index, length){},
    array_length(val){},
    array_equals(a, b){},
    array_push(arr, val){},
    array_insert(arr, pos, val){},
    array_find_index(arr, val){},
    array_find_index_ext(arr, val, start){},
    array_find_last_index(arr, val){},
    array_find_last_index_ext(arr, val, start){},
    array_sort(arr, ascend){},
    array_sort_sub(arr, sub_index, ascend){},
    array_join(arr, string){},
    ds_list_create(){},
    ds_list_destroy(list){},
    ds_list_valid(list){},
    ds_list_clear(list){},
    ds_list_size(list){},
    ds_list_shuffle(list){},
    ds_list_find_value(list, index){},
    ds_list_set(list, index, val){},
    ds_list_add(list, ...values){},
    ds_list_add_array(list, array){},
    ds_list_insert(list, index, val){},
    ds_list_delete(list, index){},
    ds_list_find_index(list, val){},
    ds_list_remove(list, val){},
    ds_list_join(list, sep){},
    ds_list_to_array(list){},
    ds_map_create(){},
    ds_map_destroy(map){},
    ds_map_valid(map){},
    ds_map_clear(map){},
    ds_map_size(map){},
    ds_map_keys(map){},
    ds_map_values(map){},
    ds_map_find_value(map, key){},
    ds_map_set(map, key, val){},
    ds_map_exists(map, key){},
    ds_map_delete(map, key){},
    ds_grid_create(w, h){},
    ds_grid_destroy(grid){},
    ds_grid_valid(grid){},
    ds_grid_clear(grid, val){},
    ds_grid_width(grid){},
    ds_grid_height(grid){},
    ds_grid_resize(grid, w, h){},
    ds_grid_get(grid, x, y){},
    ds_grid_set(grid, x, y, val){},
    ds_grid_set_region(grid, x1, y1, x2, y2, val){},
    ds_grid_sort(grid, column, ascending){},
    vertex_create_buffer(){},
    vertex_create_buffer_ext(size){},
    vertex_delete_buffer(vbuf){},
    vertex_begin(vbuf, vfmt){},
    vertex_float1(vbuf, v1){},
    vertex_float2(vbuf, v1, v2){},
    vertex_float3(vbuf, v1, v2, v3){},
    vertex_float4(vbuf, v1, v2, v3, v4){},
    vertex_color(vbuf, c, a){},
    vertex_colour(vbuf, c, a){},
    vertex_texcoord(vbuf, tx, ty){},
    vertex_position(vbuf, x, y){},
    vertex_position_3d(vbuf, x, y, z){},
    vertex_normal(vbuf, nx, ny, nz){},
    vertex_argb(vbuf, v){},
    vertex_end(vbuf){},
    vertex_get_buffer_size(vbuf){},
    vertex_get_number(vbuf){},
    vertex_freeze(vbuf){},
    vertex_submit(vbuf, prType, tex=Texture.defValue){},
    vertex_format_begin(){},
    vertex_format_end(){},
    vertex_format_delete(vfmt){},
    vertex_format_add_color(){},
    vertex_format_add_colour(){},
    vertex_format_add_normal(){},
    vertex_format_add_position(){},
    vertex_format_add_position_3d(){},
    vertex_format_add_texcoord(){},
    vertex_format_add_custom(type, usage){},
    variable_instance_exists(inst, varname){},
    variable_instance_get(inst, varname, defvalue = undefined){},
    variable_instance_set(inst, varname, value){},
    variable_instance_get_names(inst, outList = undefined){},
    sprite_add_base64(b64, num, xo, yo){},
    sprite_exists(ind){},
    sprite_get_name(ind){},
    sprite_get_number(ind){},
    sprite_get_width(ind){},
    sprite_get_height(ind){},
    sprite_get_xoffset(ind){},
    sprite_get_yoffset(ind){},
    sprite_get_bbox_mode(ind){},
    sprite_get_bbox_left(ind){},
    sprite_get_bbox_right(ind){},
    sprite_get_bbox_top(ind){},
    sprite_get_bbox_bottom(ind){},
    instance_find(obj, ind){},
    instance_number(obj){},
    instance_exists(){},
    instance_position(x,y,obj){},
    instance_place(x,y,obj){},
    instance_nearest(x,y,obj){},
    instance_furthest(x,y,obj){},
    motion_set(dir, speed){},
    motion_add(dir, speed){},
    place_free(x, y){},
    place_empty(x, y){},
    place_meeting(x, y, obj){},
    place_snapped(hsnap, vsnap){},
    move_random(hsnap, vsnap){},
    move_snap(hsnap, vsnap){},
    move_towards_point(x, y, sp){},
    move_contact_solid(dir, maxdist){},
    move_contact_all(dir, maxdist){},
    move_outside_solid(dir, maxdist){},
    move_outside_all(dir, maxdist){},
    move_bounce_solid(advanced){},
    move_bounce_all(advanced){},
    move_wrap(hor, vert, margin){},
    distance_to_point(x, y){},
    distance_to_object(obj){},
    position_empty(x, y){},
    position_meeting(x, y, obj){},
    mp_linear_step(x,y,speed,checkall){},
    mp_potential_step(x,y,speed,checkall){},
    mp_linear_step_object(x,y,speed,obj){},
    mp_potential_step_object(x, y, speed, obj){},
    collision_point(x,y,obj,prec,notme){},
    collision_rectangle(x1,y1,x2,y2,obj,prec,notme){},
    collision_circle(x1,y1,radius,obj,prec,notme){},
    collision_ellipse(x1,y1,x2,y2,obj,prec,notme){},
    collision_line(x1,y1,x2,y2,obj,prec,notme){},
    draw_set_colour(){},
    draw_set_color(){},
    draw_set_alpha(alpha){},
    draw_get_colour(){},
    draw_get_color(){},
    draw_get_alpha(){},
    merge_colour(col1,col2,amount){},
    make_colour_rgb(red,green,blue){},
    make_colour_hsv(hue,saturation,value){},
    colour_get_red(){},
    colour_get_green(){},
    colour_get_blue(){},
    colour_get_hue(){},
    colour_get_saturation(){},
    colour_get_value(){},
    merge_colour(col1,col2,amount){},
    make_color_rgb(red,green,blue){},
    make_color_hsv(hue,saturation,value){},
    color_get_red(){},
    color_get_green(){},
    color_get_blue(){},
    color_get_hue(){},
    color_get_saturation(){},
    color_get_value(){},
    merge_color(col1,col2,amount){},
    draw_set_font(){},
    draw_get_font(){},
    draw_set_halign(halign){},
    draw_get_halign(){},
    draw_set_valign(valign){},
    draw_get_valign(){},
    string_width(){},
    string_height(){},
    string_width_ext(string, sep, w){},
    string_height_ext(string, sep, w){},
    draw_text_transformed(x,y,string,xscale,yscale,angle){},
    draw_text_ext_transformed(x,y,string,sep,w,xscale,yscale,angle){},
    draw_text_colour(x,y,string,c1,c2,c3,c4,alpha){},
    draw_text_ext_colour(x,y,string,sep,w,c1,c2,c3,c4,alpha){},
    draw_text_transformed_colour(x,y,string,xscale,yscale,angle,c1,c2,c3,c4,alpha){},
    draw_text_ext_transformed_colour(x,y,string,sep,w,xscale,yscale,angle,c1,c2,c3,c4,alpha){},
    draw_text_color(x,y,string,c1,c2,c3,c4,alpha){},
    draw_text_ext_color(x,y,string,sep,w,c1,c2,c3,c4,alpha){},
    draw_text_transformed_color(x,y,string,xscale,yscale,angle,c1,c2,c3,c4,alpha){},
    draw_text_ext_transformed_color(x,y,string,sep,w,xscale,yscale,angle,c1,c2,c3,c4,alpha){},
    draw_point_colour(x,y,col1){},
    draw_line_colour(x1,y1,x2,y2,col1,col2){},
    draw_line_width_colour(x1,y1,x2,y2,w,col1,col2){},
    draw_rectangle_colour(x1,y1,x2,y2,col1,col2,col3,col4,outline){},
    draw_roundrect_colour(x1,y1,x2,y2,col1,col2,outline){},
    draw_roundrect_colour_ext(x1,y1,x2,y2,radiusx,radiusy,col1,col2,outline){},
    draw_triangle_colour(x1,y1,x2,y2,x3,y3,col1,col2,col3,outline){},
    draw_circle_colour(x,y,r,col1,col2,outline){},
    draw_ellipse_colour(x1,y1,x2,y2,col1,col2,outline){},
    draw_point_color(x,y,col1){},
    draw_line_color(x1,y1,x2,y2,col1,col2){},
    draw_line_width_color(x1,y1,x2,y2,w,col1,col2){},
    draw_rectangle_color(x1,y1,x2,y2,col1,col2,col3,col4,outline){},
    draw_roundrect_color(x1,y1,x2,y2,col1,col2,outline){},
    draw_roundrect_color_ext(x1,y1,x2,y2,radiusx,radiusy,col1,col2,outline){},
    draw_triangle_color(x1,y1,x2,y2,x3,y3,col1,col2,col3,outline){},
    draw_circle_color(x,y,r,col1,col2,outline){},
    draw_ellipse_color(x1,y1,x2,y2,col1,col2,outline){},
    draw_primitive_begin(kind){},
    draw_vertex(x,y){},
    draw_vertex_colour(x,y,col,alpha){},
    draw_vertex_color(x,y,col,alpha){},
    draw_primitive_end(){},
    sprite_get_uvs(spr,subimg){},
    font_get_uvs(font){},
    sprite_get_texture(spr,subimg){},
    font_get_texture(font){},
    texture_get_width(texid){},
    texture_get_height(texid){},
    texture_get_uvs(texid){},
    draw_primitive_begin_texture(kind,texid){},
    draw_vertex_texture(x,y,xtex,ytex){},
    draw_vertex_texture_colour(x,y,xtex,ytex,col,alpha){},
    draw_vertex_texture_color(x,y,xtex,ytex,col,alpha){},
    texture_global_scale(pow2integer){},
    gpu_set_blendenable(enable){},
    gpu_set_ztestenable(enable){},
    gpu_set_zfunc(cmp_func){},
    gpu_set_zwriteenable(enable){},
    gpu_set_fog(enable,col,start,end){},
    gpu_set_cullmode(cullmode){},
    gpu_set_blendmode(mode){},
    gpu_set_blendmode_ext(src,dest){},
    gpu_set_blendmode_ext_sepalpha(src,dest,srcalpha,destalpha){},
    gpu_set_colorwriteenable(red,green,blue,alpha){},
    gpu_set_colourwriteenable(red,green,blue,alpha){},
    gpu_set_alphatestenable(enable){},
    gpu_set_alphatestref(value){},
    gpu_set_alphatestfunc(cmp_func){},
    gpu_set_texfilter(linear){},
    gpu_set_texfilter_ext(sampler_id,linear){},
    gpu_set_texrepeat(repeat){},
    gpu_set_texrepeat_ext(sampler_id,repeat){},
    gpu_set_tex_filter(linear){},
    gpu_set_tex_filter_ext(sampler_id,linear){},
    gpu_set_tex_repeat(repeat){},
    gpu_set_tex_repeat_ext(sampler_id,repeat){},
    gpu_set_tex_mip_filter(filter){},
    gpu_set_tex_mip_filter_ext(sampler_id,filter){},
    gpu_set_tex_mip_bias(bias){},
    gpu_set_tex_mip_bias_ext(sampler_id,bias){},
    gpu_set_tex_min_mip(minmip){},
    gpu_set_tex_min_mip_ext(sampler_id,minmip){},
    gpu_set_tex_max_mip(maxmip){},
    gpu_set_tex_max_mip_ext(sampler_id,maxmip){},
    gpu_set_tex_max_aniso(maxaniso){},
    gpu_set_tex_max_aniso_ext(sampler_id,maxaniso){},
    gpu_set_tex_mip_enable(setting){},
    gpu_set_tex_mip_enable_ext(sampler_id,setting){},
    gpu_get_blendenable(){},
    gpu_get_ztestenable(){},
    gpu_get_zfunc(){},
    gpu_get_zwriteenable(){},
    gpu_get_fog(){},
    gpu_get_cullmode(){},
    gpu_get_blendmode(){},
    gpu_get_blendmode_ext(){},
    gpu_get_blendmode_ext_sepalpha(){},
    gpu_get_blendmode_src(){},
    gpu_get_blendmode_dest(){},
    gpu_get_blendmode_srcalpha(){},
    gpu_get_blendmode_destalpha(){},
    gpu_get_colorwriteenable(){},
    gpu_get_colourwriteenable(){},
    gpu_get_alphatestenable(){},
    gpu_get_alphatestref(){},
    gpu_get_alphatestfunc(){},
    gpu_get_texfilter(){},
    gpu_get_texfilter_ext(sampler_id){},
    gpu_get_texrepeat(){},
    gpu_get_texrepeat_ext(sampler_id){},
    gpu_get_tex_filter(){},
    gpu_get_tex_filter_ext(sampler_id){},
    gpu_get_tex_repeat(){},
    gpu_get_tex_repeat_ext(sampler_id){},
    gpu_get_tex_mip_filter(){},
    gpu_get_tex_mip_filter_ext(sampler_id){},
    gpu_get_tex_mip_bias(){},
    gpu_get_tex_mip_bias_ext(sampler_id){},
    gpu_get_tex_min_mip(){},
    gpu_get_tex_min_mip_ext(sampler_id){},
    gpu_get_tex_max_mip(){},
    gpu_get_tex_max_mip_ext(sampler_id){},
    gpu_get_tex_max_aniso(){},
    gpu_get_tex_max_aniso_ext(sampler_id){},
    gpu_get_tex_mip_enable(){},
    gpu_get_tex_mip_enable_ext(sampler_id){},
    gpu_push_state(){},
    gpu_pop_state(){},
    draw_light_define_ambient(col){},
    draw_light_define_direction(ind,dx,dy,dz,col){},
    draw_light_define_point(ind,x,y,z,range,col){},
    draw_light_enable(ind,enable){},
    draw_set_lighting(enable){},
    draw_light_get_ambient(){},
    draw_light_get(ind){},
    draw_get_lighting(){},
    draw_self(){},
    draw_sprite(sprite,subimg,x,y){},
    draw_sprite_pos(sprite,subimg,x1,y1,x2,y2,x3,y3,x4,y4,alpha){},
    draw_sprite_ext(sprite,subimg,x,y,xscale,yscale,rot,col,alpha){},
    draw_sprite_stretched(sprite,subimg,x,y,w,h){},
    draw_sprite_stretched_ext(sprite,subimg,x,y,w,h,col,alpha){},
    draw_sprite_tiled(sprite,subimg,x,y){},
    draw_sprite_tiled_ext(sprite,subimg,x,y,xscale,yscale,col,alpha){},
    draw_sprite_part(sprite,subimg,left,top,w,h,x,y){},
    draw_sprite_part_ext(sprite,subimg,left,top,w,h,x,y,xscale,yscale,col,alpha){},
    draw_sprite_general(sprite,subimg,left,top,w,h,x,y,xscale,yscale,rot,c1,c2,c3,c4,alpha){},
    trace(...values){},
    sprite_get(v){
      return `sprite_get("${getData(v)}")`;
    },
    sound_get(v){
      return `sound_get("${getData(v)}")`
    },

    sprite_change_offset(spr, xoff, yoff){
      if (gameState.resources[getData(spr)] === undefined) return;
      gameState.resources[getData(spr)].xoff = getData(xoff);
      gameState.resources[getData(spr)].yoff = getData(yoff);
    },

    asset_get(asset){
      return `asset_get("${getData(asset)}")`
    },
    instance_create(x, y, obj){},
    instance_destroy(...values){},

    sprite_change_collision_mask(sprite, sepmasks, bboxmode, bbleft, bbtop, bbright, bbbottom, kind){

    },

    trigger_b_reverse(){},
    random_func(index, high_value, floored){
      const rand = seedRandom(getData(index) + get(TL).length);
      let result = rand() * getData(high_value);
      if (getData(floored)) return Math.floor(result);
      else return result;
    },
    random_func_2(index, high_value, floored){
      const rand = seedRandom(getData(index) + 25 + get(TL).length);
      let result = rand() * getData(high_value);
      if (getData(floored)) return Math.floor(result);
      else return result;
    },
    sound_play(sound){},
    sound_stop(sound){},
    attack_end(){},
    destroy_hitboxes(){},
    set_state(state){},
    set_attack(attack){},
    iasa_script(){},
    can_tap_jump(){},
    hit_fx_create(sprite_index, hit_length){
      return `hit_fx_create(${getData(sprite_index)}, ${hit_length})`;
    },
    spawn_hit_fx(x, y, hit_fx_index){},
    create_hitbox(attack, hitbox_num, x, y){},
    draw_debug_text(x, y, text){},
    take_damage(player, attacker, damage){},

    set_color_profile_slot(color, shade, r, g, b){},
    set_color_profile_slot_range(shade, r, g, b){},
    shader_start(){},
    shader_end(){},

    get_hitbox_angle(hitbox_id){},

    set_victory_theme(index){},

    get_gameplay_time(){
      return get(TL).length + 1;
    },
    get_game_timer(){},

    init_shader(){},

    // getters
    get_stage_data(index){},
    get_state_name(state){},
    get_player_damage(player){},
    get_player_stocks(player){},
    get_player_team(player){},
    get_player_color(player){},
    clear_button_buffer(input_id){},

    // views
    view_get_wview(){},
    view_get_hview(){},
    view_get_xview(){},
    view_get_yview(){},

    // ANCHOR ATTACK VALUES
    set_attack_value(attack, index, value){
      let attackName = getData(attack);
      let indexName = index[4];
      let trueValue = getData(value);

      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      if (typeof indexName === "number") indexName = reverseLookup('AG_', indexName);

      const target = getAttackTarget(gameState, scriptName, attackName);
      target[indexName] = trueValue;
    },
    get_attack_value(attack, index){
      let attackName = getData(attack);
      let indexName = index[4];
      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      if (typeof indexName === "number") indexName = reverseLookup('AG_', indexName);

      return gameState.helpers.getAttack(attackName)[indexName];
    },
    reset_attack_value(attack, index){
      let attackName = getData(attack);
      let indexName = index[4];

      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      if (typeof indexName === "number") indexName = reverseLookup('AG_', indexName);

      const target = getAttackTarget(gameState, scriptName, attackName);
      delete target[indexName];
    },

    // ANCHOR WINDOW VALUES
    set_window_value(attack, window, index, value){
      let attackName = getData(attack);
      let windowNum = getData(window);
      let indexName = index[4];
      let trueValue = getData(value);

      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      if (typeof indexName === "number") indexName = reverseLookup('AG_WINDOW_', indexName);

      const target = getAttackTarget(gameState, scriptName, attackName);
      if (!target.windows[windowNum]) target.windows[windowNum] = {};
      target.windows[windowNum][indexName] = trueValue;
    },
    get_window_value(attack, window, index){
      let attackName = getData(attack);
      let windowNum = getData(window);
      let indexName = index[4];

      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      if (typeof indexName === "number") indexName = reverseLookup('AG_WINDOW_', indexName);

      return gameState.helpers.getAttack(attackName).windows[windowNum][indexName];
    },
    reset_window_value(attack, window, index){
      let attackName = getData(attack);
      let windowNum = getData(window);
      let indexName = index[4];

      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      if (typeof indexName === "number") indexName = reverseLookup('AG_WINDOW_', indexName);

      const target = getAttackTarget(gameState, scriptName, attackName);
      delete target.windows[windowNum][indexName];
    },

    // ANCHOR HITBOX VALUES
    set_hitbox_value(attack, hitbox, index, value){
      let attackName = getData(attack);
      let hitboxNum = getData(hitbox);
      let indexName = index[4];
      let trueValue = getData(value);

      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      if (typeof indexName === "number") indexName = reverseLookup('HG_', indexName);

      const target = getAttackTarget(gameState, scriptName, attackName);
      if (!target.hitboxes[hitboxNum]) target.hitboxes[hitboxNum] = {};
      target.hitboxes[hitboxNum][indexName] = trueValue;
    },
    get_hitbox_value(attack, hitbox, index){
      let attackName = getData(attack);
      let hitboxNum = getData(hitbox);
      let indexName = index[4];
      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      if (typeof indexName === "number") indexName = reverseLookup('HG_', indexName);

      return gameState.helpers.getAttack(attackName).hitboxes[hitboxNum][indexName];
    },
    reset_hitbox_value(attack, hitbox, index){
      let attackName = getData(attack);
      let hitboxNum = getData(hitbox);
      let indexName = index[4];
      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      if (typeof indexName === "number") indexName = reverseLookup('HG_', indexName);

      const target = getAttackTarget(gameState, scriptName, attackName);
      delete target.hitboxes[hitboxNum][indexName];
    },

    // ANCHOR NUM HITBOXES
    set_num_hitboxes(attack, value){
      let attackName = getData(attack);
      let trueValue = getData(value);

      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      const target = getAttackTarget(gameState, scriptName, attackName);

      for (let i = 1; i <= trueValue; i++) {
        if (!target.hitboxes[i]) target.hitboxes[i] = {};
      }
      target.__NUM_HITBOXES = trueValue;
    },
    get_num_hitboxes(attack){
      let attackName = getData(attack);
      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      return gameState.helpers.getAttack(attackName).__NUM_HITBOXES;
    },
    reset_num_hitboxes(attack){
      let attackName = getData(attack);
      if (typeof attackName === "number") attackName = reverseLookup('AT_', attackName);
      const target = getAttackTarget(gameState, scriptName, attackName);
      delete target.__NUM_HITBOXES;
    },

    tween(ease, start, end, current_time, total_time, ...values){},
    ease_linear(start, end, current_time, total_time){},
    ease_backIn(start, end, current_time, total_time, overshoot){},
    ease_backInOut(start, end, current_time, total_time, overshoot){},
    ease_backOut(start, end, current_time, total_time, overshoot){},
    ease_bounceIn(start, end, current_time, total_time){},
    ease_bounceInOut(start, end, current_time, total_time){},
    ease_bounceOut(start, end, current_time, total_time){},
    ease_circIn(start, end, current_time, total_time){},
    ease_circInOut(start, end, current_time, total_time){},
    ease_circOut(start, end, current_time, total_time){},
    ease_cubeIn(start, end, current_time, total_time){},
    ease_cubeInOut(start, end, current_time, total_time){},
    ease_cubeOut(start, end, current_time, total_time){},
    ease_expoIn(start, end, current_time, total_time){},
    ease_expoInOut(start, end, current_time, total_time){},
    ease_expoOut(start, end, current_time, total_time){},
    ease_quadIn(start, end, current_time, total_time){},
    ease_quadInOut(start, end, current_time, total_time){},
    ease_quadOut(start, end, current_time, total_time){},
    ease_quartIn(start, end, current_time, total_time){},
    ease_quartInOut(start, end, current_time, total_time){},
    ease_quartOut(start, end, current_time, total_time){},
    ease_quintIn(start, end, current_time, total_time){},
    ease_quintInOut(start, end, current_time, total_time){},
    ease_quintOut(start, end, current_time, total_time){},
    ease_sineIn(start, end, current_time, total_time){},
    ease_sineInOut(start, end, current_time, total_time){},
    ease_sineOut(start, end, current_time, total_time){}
  }
}

export default functions;