//css
export const styles = {
  paperDefault: { p:2, height: 350 },
  paperDown: { p:2, height: 400 },
  chartsPaper: { 
    p:2,
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: 'center',
    height: 350,
  },
  box: { 
    width: '100%',
  },
  panelBox: { 
    borderBottom: 1, 
    borderColor: 'divider' 
  },
  chartBox: { 
    width: 300, 
    height: 300 
  },

} as const;