const color_set = [
  {color: "#FFFFFF"},   
  {color: "#A0A0A0"},  
  {color: "#505050"},  
  {color: "#303030"},  
  {color: "#000000"},    
    
  {color: "#E4FA3C"}, 
  {color: "#FFCC33"}, 
  {color: "#FC6B3A"}, 
  {color: "#F83C40"}, 
  {color: "#F80070"}, 
  {color: "#F83478"},
  {color: "#A51E7C"}, 
  {color: "#D828B8"}, 
  {color: "#BD4EFC"}, 
  {color: "#5B4CFF"}, 
  {color: "#8080FF"},
  {color: "#7090B5"}, 
  {color: "#BCD8F8"}, 
  {color: "#3182DE"}, 
  {color: "#14D3F5"}, 
  {color: "#3BF7DE"}, 
  {color: "#00A629"}, 
  {color: "#5BE37D"}, 
  {color: "#B8FC68"}, 
];
  
const options = [
  ['Line Color', 'color_line'],
];

function mySettings(props) {
  return (
    <Page>
      <Section title="Options">
        <Toggle settingsKey="fahrenheit" label="Use Fahrenheit"/>
      </Section>
      {options.map(([title, settingsKey]) =>
        <Section title={title}>
          <ColorSelect settingsKey={settingsKey} colors={color_set} />
        </Section>
      )}
    </Page>
  );
}

registerSettingsPage(mySettings);