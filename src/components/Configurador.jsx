import { Link } from 'react-router-dom';
import {Form, Alert, InputGroup, Button, ButtonGroup, FloatingLabel,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import  React, {useState, useEffect} from 'react'
import {BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
import NegocioDataService from "../services/negocio.services"
import MinutoDataService from "../services/minuto.services"
import ParticipanteDataService from "../services/participante.service"
import MesaDataService from "../services/mesas.service"

const Configurador = ({id, setNegocioId}) => {

    const [minutos, setMinutos] = useState([]);
    const [partics, setPartics] = useState([]);
    const [mesas, setMesas] = useState([]);
    const [reuniao, setReuniao] = useState('');
    const [grupo, setGrupo] = useState('');
    const [participantes, setParticipantes] = useState(7);
    const [tempoPartMin, setTempoPartMin]= useState(0);
    const [tempoPartSeg, setTempoPartSeg]= useState(0);
    const [intIndMin, setIntIndMin]= useState(0);
    const [intIndSeg, setIntIndSeg]= useState(0);
    const [intGrupMin, setIntGrupMin]= useState(0);
    const [intGrupSeg, setIntGrupSeg] = useState(0);
    const [numMesas, setNumMesas] = useState(0);
    const [partMesa,setPartMesa] = useState("0.0");
    const [tempoTotal, setTempoTotal] = useState("00:00:00");
    const [tempoTotalHra, setTempoTotalHra] = useState(0);
    const [tempoTotalMin, setTempoTotalMin] = useState(0);
    const [tempoTotalSeg, setTempoTotalSeg] = useState(0);
    const [imgDireita, setImgDireita] = useState('');
    const [imgEsquerda, setImgEsquerda] = useState('');
    const [idioma, setIdioma] = useState('');
    const [message, setMessage] = useState({error: false, msg: ""});
    const [dataRodada, setDataRodada] = useState(Date.now());
    const [newNumMesas, setNewNumMesas] = useState(0)
    const [arrayMesas, setArrayMesas] = useState([])

    const getMesas = async () => {
        const data = await MesaDataService.getAllMesas();
        
        setMesas(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    const getPartics = async () => {
        const data = await ParticipanteDataService.getAllParticipantes();
        
        setPartics(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }


    const getMinutos = async () => {
        const data = await MinutoDataService.getAllMinutos();
        
        setMinutos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    
    const meusPartMesa = async () => {

               if(numMesas != 0 ) {

         
                for (let i = 1; i < parseInt(participantes); i++){
                    setArrayMesas([arrayMesas.push(i)])
                   
                    
                }
                console.log("agora vai")
                console.log(arrayMesas)
            setPartMesa((participantes / numMesas).toFixed(1))

            setTempoTotalHra(
            ((numMesas *
                ((Math.floor(parseInt(intGrupMin) * 60)
                         + Math.floor(parseInt(intIndMin) * 60) 
                         + Math.floor(parseInt(tempoPartMin) * 60) 
                         + parseInt(intGrupSeg) 
                         + parseInt(intIndSeg) 
                         + parseInt(tempoPartSeg)))) / 3600).toFixed(0)
            )
            setTempoTotalMin(
                ((numMesas *
                ((Math.floor(parseInt(intGrupMin) * 60)
                         + Math.floor(parseInt(intIndMin) * 60) 
                         + Math.floor(parseInt(tempoPartMin) * 60) 
                         + parseInt(intGrupSeg) 
                         + parseInt(intIndSeg) 
                         + parseInt(tempoPartSeg))) % 3600)/60).toFixed(0)

            )
                   
            setTempoTotalSeg (
               ((numMesas *
                    ((Math.floor(parseInt(intGrupMin) * 60)
                             + Math.floor(parseInt(intIndMin) * 60) 
                             + Math.floor(parseInt(tempoPartMin) * 60) 
                             + parseInt(intGrupSeg) 
                             + parseInt(intIndSeg) 
                             + parseInt(tempoPartSeg))) % 3600) % 60).toFixed(0)
    
            )  
            setNewNumMesas(numMesas)

    if(tempoTotalHra.length == 2 && tempoTotalMin.length == 2 && tempoTotalSeg.length == 1) {
        setTempoTotal(
        tempoTotalHra + ":" + tempoTotalMin + ":0" + tempoTotalSeg
        )
    }else if(tempoTotalHra.length == 2 && tempoTotalMin.length == 1 && tempoTotalSeg.length == 1) {
        setTempoTotal(
        tempoTotalHra + ":0" + tempoTotalMin + ":0" + tempoTotalSeg
        )  
    }else if(tempoTotalHra.length == 2 && tempoTotalMin.length == 2 && tempoTotalSeg.length == 2) {
        setTempoTotal(  
        tempoTotalHra + ":" + tempoTotalMin + ":" + tempoTotalSeg  
    )
    }else if(tempoTotalHra.length == 1 && tempoTotalMin.length == 1 && tempoTotalSeg.length == 1) {
        setTempoTotal(  
        "0" + tempoTotalHra + ":0" + tempoTotalMin + ":0" + tempoTotalSeg  
    )
    }else if(tempoTotalHra.length == 1 && tempoTotalMin.length == 1 && tempoTotalSeg.length == 2) {
        setTempoTotal(  
        "0" + tempoTotalHra + ":0" + tempoTotalMin + ":" + tempoTotalSeg  
    )
    }else if(tempoTotalHra.length == 2 && tempoTotalMin.length == 1 && tempoTotalSeg.length == 2) {
        setTempoTotal(  
        tempoTotalHra + ":0" + tempoTotalMin + ":" + tempoTotalSeg  
    )
    }else if(tempoTotalHra.length == 1 && tempoTotalMin.length == 2 && tempoTotalSeg.length == 1) {
        setTempoTotal(  
        "0" + tempoTotalHra + ":" + tempoTotalMin + ":0" + tempoTotalSeg  
    )
    }
}

}    
    ;
    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("");
        
        setIntIndMin(parseInt(intIndMin))
        setIntGrupMin(parseInt(intGrupMin))
        setParticipantes(parseInt(participantes))
        console.log(arrayMesas)


        if(reuniao === "" || grupo === "" || participantes === "" || tempoPartMin === "" || tempoPartSeg === "") {
            setMessage({error: true, msg: "Todos os campos são obrigatórios!"});    
            return;
        }

        setPartMesa(parseInt(partMesa))
        const newNegocio = {
            reuniao,
            grupo,
            participantes,
            tempoPartMin,
            tempoPartSeg,
            intIndMin,
            intIndSeg,
            intGrupMin,
            intGrupSeg,
            numMesas,
            partMesa,
            tempoTotal,
            imgDireita,
            imgEsquerda,
            idioma,
            dataRodada
        }

        const newMesa = {
            dataRodada,
            reuniao,
            participantes,
            arrayMesas,
            partMesa,
            numMesas
        }
        console.log(newNegocio)
        console.log(newMesa)
        try {
            if(id !== undefined && id !== "") {
                await NegocioDataService.updateNegocio(id, newNegocio);
                setNegocioId("");
                setMessage({error: false, msg: "Atualizado com sucesso"});
            }
            else {
                await NegocioDataService.addNegocios(newNegocio);
                await MesaDataService.addMesas(newMesa);
                setMessage({error: false, msg: "Nova Rodada de Negócios gerada!"});
                
            }

        } catch(err) {
            setMessage({error: true, msg:err.message})
        }
        setReuniao("");
        setGrupo("");
        setParticipantes("");
        setTempoPartMin("");
        setTempoPartSeg("");
        setIntGrupMin("");
        setIntGrupSeg("");
        setIntIndMin("");
        setIntIndSeg("");
        setNumMesas("");
        setPartMesa("0.0");
        setTempoTotal("");
        setImgDireita("");
        setImgEsquerda("");
        setIdioma("");
        setDataRodada("");
    };
        const editHandler = async(e) => {
            setMessage("");
            try{
                const docSnap = await NegocioDataService.getNegocio(id);
                console.log("O Registro é: ", docSnap.data());
                setReuniao(docSnap.data().reuniao)
                setGrupo(docSnap.data().grupo);
                setParticipantes(docSnap.data().participantes);
                setTempoPartMin(docSnap.data().tempoPartMin);
                setTempoPartSeg(docSnap.data().tempoPartSeg);
                setIntGrupMin(docSnap.data().intGrupMin);
                setIntGrupSeg(docSnap.data().intGrupSeg);
                setIntIndMin(docSnap.data().intIndMin);
                setIntIndSeg(docSnap.data().intIndSeg);
                setNumMesas(docSnap.data().numMesas);
                setPartMesa(docSnap.data().partMesa);
                setTempoTotal(docSnap.data().tempoTotal);
                setImgDireita(docSnap.data().imgDireita);
                setImgEsquerda(docSnap.data().imgEsquerda);
                setIdioma(docSnap.data().idioma);
                setDataRodada(docSnap.data().dataRodada);

            }
            catch (err) {   
                setMessage({error: true, msg: err.message});
            }
        }
        

        useEffect(() => {
   
            getPartics();
             getMinutos();
           
            meusPartMesa();
        },[numMesas, participantes, tempoPartMin, tempoPartSeg, 
         tempoTotalHra, tempoTotalMin,tempoTotalSeg,tempoTotal])
        
    return ( 
 
    
        <Container className='configurador'>
        <>
        {message?.msg && (
        <Alert 
            variant={ message?.error ? "danger": "success"} 
            dismissible 
            onClose={() => setMessage("")}
        > 
            {message?.msg}
        </Alert> 
        )}
        </>
        <Form onSubmit= {handleSubmit}>
            <Row xs={1} md={12} className="g-4">
            <Col xs={12}>
                <Card bg={'outline-primary'} >
                    <Card.Body>
                        <Card.Title className='title-card'>
                            Configurador
                        </Card.Title>
                            <Row className='row-card' >
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                        Nome da Reunião:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text>
                                        {/* <input className="input-card" />    */}
                                           <Form.Control value={reuniao} 
                                           onChange={(e) => setReuniao(e.target.value)}
                                           className="input-card" type="text" placeholder="Rodada de Negocios dia dd/mm/yyyy" />

                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                        Tipo de Apresentação:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >                               
                                            <Form.Select value={grupo}  
                                            onChange={(e) => setGrupo(e.target.value)}
                                            defaultValue={"Grupo"}
                                            className="input-card" aria-label="Floating label select example">
                                               <option value="Selecione">Selecione</option>
                                                <option value="Grupo">Grupo</option>
                                                <option value="Individual">Individual</option>
                                            </Form.Select>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Número de Participantes:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                            <Form.Select value={participantes} 
                                            onChange={(e) => { setParticipantes(e.target.value);
                                        
                                            }}
                                            defaultValue={"0"}
                                             className="input-card" aria-label="Floating label select example">
                                            
                                             {partics.sort((a,b) =>(a.idParticipante > b.idParticipante) ? 1 : -1 ).map((doc, index) => {
                                                return(
                                                    <option key={index} value={parseInt(doc.idParticipante)}>{doc.idParticipante}</option>
                                                )
                                             })};
                                                    <option value="100">100</option>
                                                    <option value="101">101</option>
                                                    <option value="102">102</option>
                                                    <option value="103">103</option>
                                                    <option value="104">104</option>
                                                    <option value="105">105</option>
                                                    <option value="106">106</option>
                                                    <option value="107">107</option>
                                                    <option value="108">108</option>
                                                    <option value="109">109</option>
                                                    <option value="110">110</option>
                                                    <option value="111">111</option>
                                                    <option value="112">112</option>
                                                    <option value="113">113</option>
                                                    <option value="114">114</option>
                                                    <option value="115">115</option>
                                                    <option value="116">116</option>
                                                    <option value="117">117</option>
                                                    <option value="118">118</option>
                                                    <option value="119">119</option>
                                                    <option value="120">120</option>
                                                    <option value="121">121</option>
                                                    <option value="122">122</option>
                                                    <option value="123">123</option>
                                                    <option value="124">124</option>
                                                    <option value="125">125</option>
                                                    <option value="126">126</option>
                                                    <option value="127">127</option>
                                                    <option value="128">128</option>
                                                    <option value="129">129</option>
                                                    <option value="130">130</option>
                                                    <option value="131">131</option>
                                                    <option value="132">132</option>
                                                    <option value="133">133</option>
                                                    <option value="134">134</option>
                                                    <option value="135">135</option>
                                                    <option value="136">136</option>
                                                    <option value="137">137</option>
                                                    <option value="138">138</option>
                                                    <option value="139">139</option>
                                                    <option value="140">140</option>
                                                    <option value="141">141</option>
                                                    <option value="142">142</option>
                                                    <option value="143">143</option>
                                                    <option value="144">144</option>
                                                    <option value="145">145</option>
                                                    <option value="146">146</option>
                                                    <option value="147">147</option>
                                                    <option value="148">148</option>
                                                    <option value="149">149</option>
                                                    <option value="150">150</option>
                                                    <option value="151">151</option>
                                                    <option value="152">152</option>
                                                    <option value="153">153</option>
                                                    <option value="154">154</option>
                                                    <option value="155">155</option>
                                                    <option value="156">156</option>
                                                    <option value="157">157</option>
                                                    <option value="158">158</option>
                                                    <option value="159">159</option>
                                                    <option value="160">160</option>
                                                    <option value="161">161</option>
                                                    <option value="162">162</option>
                                                    <option value="163">163</option>
                                                    <option value="164">164</option>
                                                    <option value="165">165</option>
                                                    <option value="166">166</option>
                                                    <option value="167">167</option>
                                                    <option value="168">168</option>
                                                    <option value="169">169</option>
                                                    <option value="170">170</option>
                                                    <option value="171">171</option>
                                                    <option value="172">172</option>
                                                    <option value="173">173</option>
                                                    <option value="174">174</option>
                                                    <option value="175">175</option>
                                                    <option value="176">176</option>
                                                    <option value="177">177</option>
                                                    <option value="178">178</option>
                                                    <option value="179">179</option>
                                                    <option value="180">180</option>
                                                    <option value="181">181</option>
                                                    <option value="182">182</option>
                                                    <option value="183">183</option>
                                                    <option value="184">184</option>
                                                    <option value="185">185</option>
                                                    <option value="186">186</option>
                                                    <option value="187">187</option>
                                                    <option value="188">188</option>
                                                    <option value="189">189</option>
                                                    <option value="190">190</option>
                                                    <option value="191">191</option>
                                                    <option value="192">192</option>
                                                    <option value="193">193</option>
                                                    <option value="194">194</option>
                                                    <option value="195">195</option>
                                                    <option value="196">196</option>
                                                    <option value="197">197</option>
                                                    <option value="198">198</option>
                                                    <option value="199">199</option>
                                                    <option value="200">200</option>
                                                    <option value="201">201</option>
                                                    <option value="202">202</option>
                                                    <option value="203">203</option>
                                                    <option value="204">204</option>
                                                    <option value="205">205</option>
                                                    <option value="206">206</option>
                                                    <option value="207">207</option>
                                                    <option value="208">208</option>
                                                    <option value="209">209</option>
                                                    <option value="210">210</option>
                                                    <option value="211">211</option>
                                                    <option value="212">212</option>
                                                    <option value="213">213</option>
                                                    <option value="214">214</option>
                                                    <option value="215">215</option>
                                                    <option value="216">216</option>
                                                    <option value="217">217</option>
                                                    <option value="218">218</option>
                                                    <option value="219">219</option>
                                                    <option value="220">220</option>
                                                    <option value="221">221</option>
                                                    <option value="222">222</option>
                                                    <option value="223">223</option>
                                                    <option value="224">224</option>
                                                    <option value="225">225</option>
                                                    <option value="226">226</option>
                                                    <option value="227">227</option>
                                                    <option value="228">228</option>
                                                    <option value="229">229</option>
                                                    <option value="230">230</option>
                                                    <option value="231">231</option>
                                                    <option value="232">232</option>
                                                    <option value="233">233</option>
                                                    <option value="234">234</option>
                                                    <option value="235">235</option>
                                                    <option value="236">236</option>
                                                    <option value="237">237</option>
                                                    <option value="238">238</option>
                                                    <option value="239">239</option>
                                                    <option value="240">240</option>
                                                    <option value="241">241</option>
                                                    <option value="242">242</option>
                                                    <option value="243">243</option>
                                                    <option value="244">244</option>
                                                    <option value="245">245</option>
                                                    <option value="246">246</option>
                                                    <option value="247">247</option>
                                                    <option value="248">248</option>
                                                    <option value="249">249</option>
                                                    <option value="250">250</option>
                                                    <option value="251">251</option>
                                                    <option value="252">252</option>
                                                    <option value="253">253</option>
                                                    <option value="254">254</option>
                                                    <option value="255">255</option>
                                                    <option value="256">256</option>
                                                    <option value="257">257</option>
                                                    <option value="258">258</option>
                                                    <option value="259">259</option>
                                                    <option value="260">260</option>
                                                    <option value="261">261</option>
                                                    <option value="262">262</option>
                                                    <option value="263">263</option>
                                                    <option value="264">264</option>
                                                    <option value="265">265</option>
                                                    <option value="266">266</option>
                                                    <option value="267">267</option>
                                                    <option value="268">268</option>
                                                    <option value="269">269</option>
                                                    <option value="270">270</option>
                                                    <option value="271">271</option>
                                                    <option value="272">272</option>
                                                    <option value="273">273</option>
                                                    <option value="274">274</option>
                                                    <option value="275">275</option>
                                                    <option value="276">276</option>
                                                    <option value="277">277</option>
                                                    <option value="278">278</option>
                                                    <option value="279">279</option>
                                                    <option value="280">280</option>
                                                    <option value="281">281</option>
                                                    <option value="282">282</option>
                                                    <option value="283">283</option>
                                                    <option value="284">284</option>
                                                    <option value="285">285</option>
                                                    <option value="286">286</option>
                                                    <option value="287">287</option>
                                                    <option value="288">288</option>
                                                    <option value="289">289</option>
                                                    <option value="290">290</option>
                                                    <option value="291">291</option>
                                                    <option value="292">292</option>
                                                    <option value="293">293</option>
                                                    <option value="294">294</option>
                                                    <option value="295">295</option>
                                                    <option value="296">296</option>
                                                    <option value="297">297</option>
                                                    <option value="298">298</option>
                                                    <option value="299">299</option>
                                                    <option value="300">300</option>


                                                
                                            </Form.Select>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Tempo por Participante:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <Row>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={tempoPartMin}  
                                            onChange={(e) => setTempoPartMin(e.target.value)}
                                            defaultValue={"0"}
                                            className="input-card-se" aria-label="Floating label select example">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                            <option value="32">32</option>
                                            <option value="33">33</option>
                                            <option value="34">34</option>
                                            <option value="35">35</option>
                                            <option value="36">36</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                            <option value="40">40</option>
                                            <option value="41">41</option>
                                            <option value="42">42</option>
                                            <option value="43">43</option>
                                            <option value="44">44</option>
                                            <option value="45">45</option>
                                            <option value="46">46</option>
                                            <option value="47">47</option>
                                            <option value="48">48</option>
                                            <option value="49">49</option>
                                            <option value="50">50</option>
                                            <option value="51">51</option>
                                            <option value="52">52</option>
                                            <option value="53">53</option>
                                            <option value="54">54</option>
                                            <option value="55">55</option>
                                            <option value="56">56</option>
                                            <option value="57">57</option>
                                            <option value="58">58</option>
                                            <option value="59">59</option>

                                            
                                                
                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={tempoPartSeg} 
                                                onChange={(e) => setTempoPartSeg(e.target.value)}
                                                defaultValue={"0"}
                                                className="input-card-se" aria-label="Floating label select example">
                                              <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>

                                            </Form.Select>
                                        </Col>
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> seg</p>
                                        </Col>
                                    </Row>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Intervalo Individual:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <Row>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={intIndMin}
                                                onChange={(e) => setIntIndMin(e.target.value)}
                                                defaultValue={"0"} 
                                                className="input-card-se" aria-label="Floating label select example">
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>

                                                
                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                           <Form.Select value={intIndSeg}  
                                                onChange={(e) => setIntIndSeg(e.target.value)}
                                                defaultValue={"0"} 
                                                className="input-card-se" aria-label="Floating label select example">
                                               <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>


                                            </Form.Select>
                                        </Col>
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> seg</p>
                                        </Col>
                                    </Row>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Intervalo do Grupo:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <Row>
                                        <Col xs={4} md={4}>
                                           <Form.Select value={intGrupMin}
                                            onChange={(e) => setIntGrupMin(e.target.value)} 
                                            defaultValue={"0"} 
                                           className="input-card-se" aria-label="Floating label select example">
                                          <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                            <option value="32">32</option>
                                            <option value="33">33</option>
                                            <option value="34">34</option>
                                            <option value="35">35</option>
                                            <option value="36">36</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                            <option value="40">40</option>
                                            <option value="41">41</option>
                                            <option value="42">42</option>
                                            <option value="43">43</option>
                                            <option value="44">44</option>
                                            <option value="45">45</option>
                                            <option value="46">46</option>
                                            <option value="47">47</option>
                                            <option value="48">48</option>
                                            <option value="49">49</option>
                                            <option value="50">50</option>
                                            <option value="51">51</option>
                                            <option value="52">52</option>
                                            <option value="53">53</option>
                                            <option value="54">54</option>
                                            <option value="55">55</option>
                                            <option value="56">56</option>
                                            <option value="57">57</option>
                                            <option value="58">58</option>
                                            <option value="59">59</option>

                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={intGrupSeg}  
                                            onChange={(e) => setIntGrupSeg(e.target.value)}
                                            defaultValue={"0"} 
                                            className="input-card-se" aria-label="Floating label select example">
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                        
                                            </Form.Select>
                                       
                                        </Col>
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> seg</p>
                                        </Col>
                                    </Row>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Número de Mesas: 
                                  
                                    </Card.Text>                                    
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <Row xs={12} md={12}>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={numMesas} 
                                                onChange={(e) => {
                                                setNumMesas(e.target.value); 
                                                setNewNumMesas(e.target.value);    
                                                
                                                } }
                                                
                                                className="input-card-se" aria-label="Floating label select example">
                                                 {minutos.map((doc, index) => {
                                                return (
                                                    <option key={index} value={doc.minuto}>{doc.minuto}</option>
                                                    )
                                                })};         
                                                   
                                            </Form.Select>
                                       </Col >
                                        <Col xs={3} md={3} className="hr-card-p">
                                            <FloatingLabel value={partMesa}
                                                className=""
                                                controlId="floatingInputGrid" >          
                                                { 
                                                partMesa !== "1.0" ?
                                                 "~" + parseInt(partMesa)
                                                    :
                                                    partMesa !== "2.0" ?
                                                     "~" + parseInt(partMesa)
                                                    :
                                                    partMesa !== "3.0" ?
                                                     "~" + parseInt(partMesa)
                                                    :
                                                    partMesa !== "4.0" ?
                                                    "~" + parseInt(partMesa)
                                                    :
                                                    partMesa !== "5.0" ?
                                                     "~" + parseInt(partMesa)
                                                    :
                                                    partMesa !== "6.0" ?
                                                    "~" + parseInt(partMesa)
                                                    :
                                                    partMesa !== "7.0" ?
                                                    "~" + parseInt(partMesa)
                                                    :
                                                    partMesa !== "8.0" ?
                                                    "~" + parseInt(partMesa)
                                                    :
                                                    partMesa !== "9.0" ?
                                                 "~" + parseInt(partMesa)
                                                 :
                                                 partMesa !== "10.0" ?
                                                 "~" + parseInt(partMesa)
                                                 :
                                                  parseInt(partMesa)

                                                }      
                                            
                                            </FloatingLabel> 
                                        </Col>
                                        <Col xs={1} md={1} className="" >
                                         <BsFillPeopleFill   className="hr-card-participantes-icon"/>
                                        </Col>
                                        <Col xs={4} md={4}  className="">
                                        <FloatingLabel 
                                        className=""
                                        controlId="floatingInputGrid"  >
                                        por mesa
                                        </FloatingLabel> 
                                        </Col>
                                    </Row>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Tempo Total:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                           <Form.Control disabled   value={tempoTotal} 
                                           
                                           className="input-card" size="sm" type="text" placeholder={tempoTotal}  />

                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Imagem Direita:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                        <Form.Control value={imgDireita}
                                        onChange={(e)   => setImgDireita(e.target.value)}
                                        className="mb-0 input-card" type="file"  />
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Imagem Esquerda:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                        <Form.Control value={imgEsquerda} 
                                        onChange={(e)   => setImgEsquerda(e.target.value)}
                                        className="mb-0 input-card" type="file"  />
                                     {/* <Form.Group controlId="formFileSm" className="mb-3 input-card">
                                        <Form.Control type="file" size="sm" />
                                    </Form.Group> */}
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Idioma:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                            <Form.Select value = {idioma}
                                            onChange={(e)   =>  setIdioma(e.target.value)}  
                                            defaultValue={"Português"}                                         
                                            className="input-card" aria-label="Floating label select example">
                                                <option value="Português">Português</option>
                                                <option value="Inglês">Inglês</option>
                                                <option value="Espanhol">Espanhol</option>
                                            </Form.Select>
                                      
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={4}>
                                <Button variant="primary" type="submit">
                                    Salvar
                                </Button>
                                </Col>
                                <Col xs={8} md={8} style={{ textAlign: 'end'}}>
                                    <Link to="/" >
                                        <Button  variant="danger"> 
                                            Cancelar
                                        </Button>
                                    </Link>
                                </Col>
                                
                            </Row>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </Form>
        </Container>

     );
}
 
export default Configurador