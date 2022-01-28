export const egef = `<?xml version="1.0" encoding="utf-8"?>
<knowledgebase>
  <properties>
    <title>EGEF</title>
    <subtitle>Escala Geriátrica de Evaluación Funcional</subtitle>
    <instructions>Defina el item por la respuesta del paciente, al que no coopera utilice la opinión del cuidador responsable. Ante la duda entre items, marque el inferior.</instructions>
    <description>CRITERIOS DE REMISION PARA EQUIPO MULTIDISCIPLINARIO DE ATENCION GERONTOLOGICA.(ANCIANO FRAGIL)
        •	Doble incontinencia.
        •	Alteraciones de la movilidad y el equilibrio menores de 4 según EGEF.
        •	Polifarmacia (Uso de medicamentos menores de 3).
        •	Alteración de todos lo items del EGEF en 4 o menos.
        •	APP de Síndrome Demencial con: Alteraciones del estado emocional, del sueño, de la movilidad, del uso de medicamentos, deficiente apoyo familiar, deficiente apoyo social, mala situación económica.
        •	Cualquier combinación de los problemas sociales (situación familiar, social y económica) menores de 4 según EGEF.
        •	Alteraciones del estado funcional global menores de 4 según EGEF.
        •	Mayor de 80 años con alguna alteración del EGEF.
        •	Anciano solo con alguna alteración del EGEF.
        •	Alteraciones de la memoria menor de 4 según EGEF.

    La ESCALA no sustituye el examen clínico que se recomienda realizar como parte del Examen Periódico de Salud al Adulto Mayor, solamente lo complementa.
    </description>
    <author>CITED</author>
    <year>2017</year>
    <expression>
      <item operator="==" value="true" label="Anciano frágil" reference="">(I == 1) || (II &lt; 4) || (III &lt; 4) || (IV &lt; 4) || (V &lt; 4) || (VI &lt; 3) || (VII &lt; 4) || (VIII &lt; 4) || (IX &lt; 4) || (X &lt; 4) || (XI &lt; 4) || (XII &lt; 4) || (XIII &lt; 4) || (XIV == 4)</item>
      <item operator="==" value="false" label="Anciano sin fragilidad" reference="">(I == 1) || (II &lt; 4) || (III &lt; 4) || (IV &lt; 4) || (V &lt; 4) || (VI &lt; 3) || (VII &lt; 4) || (VIII &lt; 4) || (IX &lt; 4) || (X &lt; 4) || (XI &lt; 4) || (XII &lt; 4) || (XIII &lt; 4) || (XIV == 4)</item>
    </expression>
  </properties>
  <questions>
    <question id="I" text="Continencia" expression="value &gt; 1" type="radio" reference="">
      <item id="5" value="5">Perfectamente continente</item>
      <item id="4" value="4">Ha perdido ocasionalmente el control de la micción</item>
      <item id="3" value="3">Incontinencia urinaria, con limitaciones en su vida diaria</item>
      <item id="2" value="2">Incontinencia urinaria impide realizar su vida diaria o le obliga al sondaje</item>
      <item id="1" value="1">Doble incontinencia (urinaria y fecal) con pérdida de autonomía</item>
    </question>
    <question id="II" text="Movilidad" expression="value &gt; 3" type="radio" reference="">
      <item id="5" value="5">Se moviliza sin limitaciones, tanto fuera como dentro del hogar</item>
      <item id="4" value="4">Alguna limitación en la movilidad en particular con el transporte público</item>
      <item id="3" value="3">Dificultades en la movilidad que limitan satisfacer su vida diaria</item>
      <item id="2" value="2">Depende para movilizarse de la ayuda de otra persona</item>
      <item id="1" value="1">Se encuentra totalmente confinado a la cama o al sillón</item>
    </question>
    <question id="III" text="Equilibrio" expression="value &gt; 3" type="radio" reference="">
      <item id="5" value="5">No refiere trastorno del equilibrio</item>
      <item id="4" value="4">Refiere trastorno del equilibrio pero no afecta su vida diaria</item>
      <item id="3" value="3">Trastorno del equilibrio, con caídas y limitación de la autonomía</item>
      <item id="2" value="2">Trastornos del equilibrio lo hacen dependiente de ayuda en su vida diaria</item>
      <item id="1" value="1">La falta de equilibrio lo mantienen totalmente incapacitado</item>
    </question>
    <question id="IV" text="Visión" expression="value &gt; 3" type="radio" reference="">
      <item id="5" value="5">Tiene visión normal (aunque para ello usa lentes)</item>
      <item id="4" value="4">Refiere dificultad para ver, pero esto no limita en su vida cotidiana</item>
      <item id="3" value="3">Dificultad para ver, que limita sus actividades cotidianas</item>
      <item id="2" value="2">Problemas de la visión, lo obligan a depender de otras personas</item>
      <item id="1" value="1">Ciego o totalmente incapacitado por la falta de visión</item>
    </question>
    <question id="V" text="Audición" expression="value &gt; 3" type="radio" reference="">
      <item id="5" value="5">Tiene audición normal (aunque para ello use prótesis auditiva)</item>
      <item id="4" value="4">Refiere dificultad para oír, pero esto no repercute en su vida diaria</item>
      <item id="3" value="3">Evidente dificultad para oír, con repercusión en su vida diaria</item>
      <item id="2" value="2">Severos problemas de audición, que le limitan la comunicación</item>
      <item id="1" value="1">Sordo o aislado por la falta de audición</item>
    </question>
    <question id="VI" text="Uso de Medicamentos" expression="value &gt; 2" type="radio" reference="">
      <item id="5" value="5">Sin medicamentos, (no incluyen vitaminas ni productos naturales)</item>
      <item id="4" value="4">Usa menos de tres de forma habitual</item>
      <item id="3" value="3">Usa de 3 a 5  por más de un mes o indicados por varios médicos</item>
      <item id="2" value="2">Usa más de 6 medicamentos</item>
      <item id="1" value="1">Se automedica o no lleva control de los medicamentos que toma</item>
    </question>
    <question id="VII" text="Sueño" expression="value &gt; 3" type="radio" reference="">
      <item id="5" value="5">No refiere trastornos del sueño</item>
      <item id="4" value="4">Trastornos ocasionales del sueño, no tiene necesidad de somníferos</item>
      <item id="3" value="3">Debe usar somníferos para lograr un sueño que lo satisfaga</item>
      <item id="2" value="2">Pese al uso de psicofármacos mantiene trastornos del sueño</item>
      <item id="1" value="1">Trastornos severos del sueño que le impiden realizar su vida diaria</item>
    </question>
    <question id="VIII" text="Estado Emocional" expression="value &gt; 3" type="radio" reference="">
      <item id="5" value="5">Se mantiene usualmente con buen estado de ánimo</item>
      <item id="4" value="4">Trastornos emocionales que supera sin la ayuda profesional</item>
      <item id="3" value="3">Trastornos emocionales le obligan al uso de tratamiento</item>
      <item id="2" value="2">Mantienen trastornos emocionales que lo limitan, aún con tratamiento</item>
      <item id="1" value="1">Los trastornos emocionales lo incapacitan, intento o idea suicida</item>
    </question>
    <question id="IX" text="Memoria" expression="value &gt; 3" type="radio" reference="">
      <item id="5" value="5">Buena memoria. Niega trastornos de la misma</item>
      <item id="4" value="4">Refiere problemas de memoria, pro estos no limitan su vida diaria</item>
      <item id="3" value="3">Trastornos de memoria, que lo limitan para actividades de su vida diaria</item>
      <item id="2" value="2">Trastornos de la memoria que lo obligan a ser dependientes una parte del tiempo</item>
      <item id="1" value="1">La pérdida de memoria lo mantiene incapacitado y dependiente total</item>
    </question>
    <question id="X" text="Apoyo Familiar" expression="value &gt; 3" type="radio" reference="">
      <item id="5" value="5">Cuenta con todo el apoyo familiar que demandan sus necesidades</item>
      <item id="4" value="4">Existe apoyo familiar, pero puede tener limitaciones en ocasiones</item>
      <item id="3" value="3">Apoyo familiar restringido a cuando el anciano tiene situación de crisis</item>
      <item id="2" value="2">Apoyo familiar inseguro incluso en momentos de crisis para el anciano</item>
      <item id="1" value="1">Ausencia o abandono familiar total</item>
    </question>
    <question id="XI" text="Apoyo Social" expression="value &gt; 3" type="radio" reference="">
      <item id="5" value="5">Apoyo total e irrestricto por parte de los vecinos y amigos</item>
      <item id="4" value="4">Cuenta con apoyo de vecinos y amigos pero este es limitado</item>
      <item id="3" value="3">Apoyo de vecinos y amigos se restringe a momentos de crisis</item>
      <item id="2" value="2">Apoyo de vecinos y amigos inseguro aún en momentos de crisis</item>
      <item id="1" value="1">Aislado. Ausencia total de apoyo por parte de vecinos y amigos</item>
    </question>
    <question id="XII" text="Situación económica" expression="value &gt; 3" type="radio" reference="">
      <item id="5" value="5">Cubre todas sus necesidades económicas con ingresos propios</item>
      <item id="4" value="4">Cubre todas sus necesidades pero lo logra con ayuda de otros</item>
      <item id="3" value="3">Cubre solo sus necesidades básicas, aún con la ayuda de otros</item>
      <item id="2" value="2">Tiene dificultades para cubrir todas sus necesidades  básicas</item>
      <item id="1" value="1">Depende económicamente de la asistencia social</item>
    </question>
    <question id="XIII" text="Estado Funcional Global" expression="value &gt; 3" type="radio" reference="">
      <item id="5" value="5">Es totalmente independiente y activo en su vida diaria</item>
      <item id="4" value="4">Es independiente pero necesita de ayuda no diaria para alguna AIVD</item>
      <item id="3" value="3">Tiene limitaciones que exigen ayuda diaria, pero puede pasar un día solo</item>
      <item id="2" value="2">Tiene limitaciones que impiden que permanezca más de 8 horas sólo</item>
      <item id="1" value="1">Está totalmente incapacitado y exige custodia permanente</item>
    </question>
    <question id="XIV" text="Edad" expression="value == 5" type="radio" reference="">
      <item id="5" value="5">Menor de 80 años</item>
      <item id="4" value="4">Mayor de 80 años</item>
    </question>
  </questions>
</knowledgebase>`;

export const katz = `<?xml version="1.0" encoding="utf-8"?>
<knowledgebase>
<properties>
<title>katz</title>
<subtitle>Actividades Básicas de la Vida Diaria</subtitle>
<instructions>Paciente dependiente para levantarse y/o ir al servicio y/o bañarse y/o vestirse y/o comer</instructions>
<description>Instrumento que evalúa las Actividades Básicas de la Vida Diaria (ABVD)</description>
<author>Katz</author>
<year>2018</year>
<expression>
<item operator="&gt;" value="0" label="Adulto mayor en estado de necesidad funcional" reference="egef">I + II + III + IV + V + VI</item>
<item operator="==" value="0" label="Adulto mayor sin necesidad funcional" reference="">I + II + III + IV + V + VI</item>
</expression>
</properties>
<questions>
<question id="I" text="Bañarse" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="II" text="Vestirse" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="III" text="Ir al servicio" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="IV" text="Levantarse" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="V" text="Continencia" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="VI" text="Comer" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
</questions>
</knowledgebase>`;

export const lawton = `<?xml version="1.0" encoding="utf-8"?>
<knowledgebase>
<properties>
<title>lawton</title>
<subtitle>Actividades Instrumentadas de la Vida Diaria</subtitle>
<instructions>Paciente que presenta al menos 2 de las siguientes alteradas:
-Ir de compras - Preparar alimentos - Manejo de la casa - Lavar - Uso de medicamentos – Continencia</instructions>
<description>Instrumento que evalúa las Actividades Instrumentadas de la Vida Diaria (AIVD)</description>
<author>Lawton</author>
<year>2018</year>
<expression>
<item operator="&gt;" value="1" label="Adulto mayor en estado de fragilidad funcional" reference="egef">I + II + III + IV + V + VI + VII + VIII</item>
<item operator="&lt;" value="2" label="Adulto mayor sin fragilidad funcional" reference="">I + II + III + IV + V + VI + VII + VIII</item>
</expression>
</properties>
<questions>
<question id="I" text="Uso del teléfono" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="II" text="Ir de compras" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="III" text="Preparar alimentos" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="IV" text="Manejo de la casa" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="V" text="Lavar" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="VI" text="Transporte" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="VII" text="Uso de medicamentos" picture="" expression="value == 0" type="radio" reference="egef">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
<question id="VIII" text="Manejo de finanzas" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Dependiente</item>
<item id="2" value="0">Independiente</item>
</question>
</questions>
</knowledgebase>`;

export const frail = `<?xml version="1.0" encoding="utf-8"?>
<knowledgebase>
<properties>
<title>FRAIL</title>
<subtitle>Cuestionario de apoyo para identificar fragilidad en el adulto mayor</subtitle>
<instructions>Responda Si o No a cada pregunta</instructions>
<description>Cuestionario de apoyo para identificar fragilidad en el adulto mayor</description>
<author>Frail</author>
<year>2020</year>
<expression>
<item operator="&gt;" value="2" label="Adulto Mayor Frágil" reference="">I + II + III + IV + V</item>
<item operator="between" value1="0" value2="3" label="Adulto Mayor Pre Frágil" reference="">I + II + III + IV + V</item>
<item operator="==" value="0" label="Adulto Mayor Robusto" reference="">I + II + III + IV + V</item>
</expression>
</properties>
<questions>
<question id="I" text="¿Se siente frecuentemente cansado(a)?" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Si</item>
<item id="2" value="0">No</item>
</question>
<question id="II" text="¿Puede subir 1 tramo de escalera?" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="0">Si</item>
<item id="2" value="1">No</item>
</question>
<question id="III" text="¿Puede caminar 1 cuadra?" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="0">Si</item>
<item id="2" value="1">No</item>
</question>
<question id="IV" text="¿Tiene más de 5 enfermedades?" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Si</item>
<item id="2" value="0">No</item>
</question>
<question id="V" text="¿Ha notado que ha perdido 10 libras o más de peso en los últimos 6 meses?" picture="" expression="value == 0" type="radio" reference="">
<item id="1" value="1">Si</item>
<item id="2" value="0">No</item>
</question>
</questions>
</knowledgebase>`;
