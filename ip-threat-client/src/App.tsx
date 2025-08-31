import { IPProvider, useIPContext } from "./context/IPContext";
import IPInput from "./components/IPInput";
import ResultsView from "./components/ResultsView";

function App() {
  return (
    <IPProvider>
      <h1>IP Threat Checker</h1>
      <IPInputWrapper />
      <ResultsViewWrapper />
    </IPProvider>
  );
}

function IPInputWrapper() {
  return <IPInput/>;
}

function ResultsViewWrapper() {
  const { data, loading, error } = useIPContext();
  return <ResultsView data={data} loading={loading} error={error} />;
}

export default App;
