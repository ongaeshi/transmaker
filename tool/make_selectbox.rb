# -*- coding: utf-8 -*-
#
# @file 
# @brief
# @author ongaeshi
# @date   2011/10/23

def make_selectbox(filename)
  array = File.read(filename).split("\n")
  array = array.map{|v| v.split }

  txt = array.map{|v|
    "        <option value=\"#{v[0]}\">#{v[1]}</option>"
  }.join("\n")

  <<EOF
      <select id="dst-lang-select" name="dst">
        <option value="">Auto</option>
#{txt}
      </select>
EOF
end

puts make_selectbox(ARGV[0])
