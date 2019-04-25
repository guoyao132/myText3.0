<template>
  <codemirror
    ref="myCm"
    :value="content"
    :options='optionsCm'
    @changes="changes"
    class="code"
  >
  </codemirror>
</template>

<script>
  import { codemirror } from 'vue-codemirror'
  import "codemirror/mode/javascript/javascript"
  import "codemirror/mode/python/python.js"
  import 'codemirror/mode/go/go'
  import 'codemirror/mode/xml/xml.js'




  export default {
    name: 'Codemirror',
    components:{
      codemirror
    },
    computed: {
      codemirror() {
        return this.$refs.myCm.codemirror
      }
    },
    data: function () {
      return {
        content: "# Literals\n" +
          "1234\n" +
          "0.0e101\n" +
          ".123\n" +
          "0b01010011100\n" +
          "0o01234567\n" +
          "0x0987654321abcdef\n" +
          "7\n" +
          "2147483647\n" +
          "3L\n" +
          "79228162514264337593543950336L\n" +
          "0x100000000L\n" +
          "79228162514264337593543950336\n" +
          "0xdeadbeef\n" +
          "3.14j\n" +
          "10.j\n" +
          "10j\n" +
          ".001j\n" +
          "1e100j\n" +
          "3.14e-10j\n" +
          "\n" +
          "\n" +
          "# String Literals\n" +
          "'For\\''\n" +
          "\"God\\\"\"\n" +
          "\"\"\"so loved\n" +
          "the world\"\"\"\n" +
          "'''that he gave\n" +
          "his only begotten\\' '''\n" +
          "'that whosoever believeth \\\n" +
          "in him'\n" +
          "''\n" +
          "\n" +
          "# Identifiers\n" +
          "__a__\n" +
          "a.b\n" +
          "a.b.c\n" +
          "\n" +
          "#Unicode identifiers on Python3\n" +
          "# a = x\\ddot\n" +
          "a⃗ = ẍ\n" +
          "# a = v\\dot\n" +
          "a⃗ = v̇\n" +
          "\n" +
          "#F\\vec = m \\cdot a\\vec\n" +
          "F⃗ = m•a⃗ \n" +
          "\n" +
          "# Operators\n" +
          "+ - * / % & | ^ ~ < >\n" +
          "== != <= >= <> << >> // **\n" +
          "and or not in is\n" +
          "\n" +
          "#infix matrix multiplication operator (PEP 465)\n" +
          "A @ B\n" +
          "\n" +
          "# Delimiters\n" +
          "() [] {} , : ` = ; @ .  # Note that @ and . require the proper context on Python 2.\n" +
          "+= -= *= /= %= &= |= ^=\n" +
          "//= >>= <<= **=\n" +
          "\n" +
          "# Keywords\n" +
          "as assert break class continue def del elif else except\n" +
          "finally for from global if import lambda pass raise\n" +
          "return try while with yield\n" +
          "\n" +
          "# Python 2 Keywords (otherwise Identifiers)\n" +
          "exec print\n" +
          "\n" +
          "# Python 3 Keywords (otherwise Identifiers)\n" +
          "nonlocal\n" +
          "\n" +
          "# Types\n" +
          "bool classmethod complex dict enumerate float frozenset int list object\n" +
          "property reversed set slice staticmethod str super tuple type\n" +
          "\n" +
          "# Python 2 Types (otherwise Identifiers)\n" +
          "basestring buffer file long unicode xrange\n" +
          "\n" +
          "# Python 3 Types (otherwise Identifiers)\n" +
          "bytearray bytes filter map memoryview open range zip\n" +
          "\n" +
          "# Some Example code\n" +
          "import os\n" +
          "from package import ParentClass\n" +
          "\n" +
          "@nonsenseDecorator\n" +
          "def doesNothing():\n" +
          "    pass\n" +
          "\n" +
          "class ExampleClass(ParentClass):\n" +
          "    @staticmethod\n" +
          "    def example(inputStr):\n" +
          "        a = list(inputStr)\n" +
          "        a.reverse()\n" +
          "        return ''.join(a)\n" +
          "\n" +
          "    def __init__(self, mixin = 'Hello'):\n" +
          "        self.mixin = mixin\n" +
          "\n" +
          "# Python 3.6 f-strings (https://www.python.org/dev/peps/pep-0498/)\n" +
          "f'My name is {name}, my age next year is {age+1}, my anniversary is {anniversary:%A, %B %d, %Y}.'\n" +
          "f'He said his name is {name!r}.'\n" +
          "f\"\"\"He said his name is {name!r}.\"\"\"\n" +
          "f'{\"quoted string\"}'\n" +
          "f'{{ {4*10} }}'\n" +
          "f'This is an error }'\n" +
          "f'This is ok }}'\n" +
          "fr'x={4*10}\\n'\n",
        optionsCm: {
          mode: 'python',       //模式
          lineNumbers: true,      //是否显示行号
          theme: 'pastel-on-dark',         //主题
          indentUnit: 2,            //默认缩进单位
          smartIndent: true,        //是否智能缩进
          tabSize: 2,               //tab键长度
          readOnly: false,        //是否只读
          firstLineNumber: 1,     //第一行初始值
          lineWrapping: true,    //是否自动换行
        },
      }
    },
    methods: {
      changes(){
        console.log(this.codemirror);
        console.log(this.codemirror.getValue());
      }
    },
    mounted: function () {
    },
  }
</script>
<style>
  @import "~codemirror/theme/pastel-on-dark.css";
</style>

<style scoped>

</style>