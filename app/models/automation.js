//TODO: GJ: this was extracted from the previous talk
//          refactor to make faster and easier to understand

export default class Automation {

  constructor(abletonAutomationData) {
    abletonAutomationData.automation[0].Time = '1'; //we don't need negative beats
    this.abletonAutomationData = this._transformAutomationData(abletonAutomationData);

    let beats = [];

    for(let i=1; i<this.abletonAutomationData.lastBeat; i++) {
      let points = this._getPointsForBeat(i);

      if(points === undefined) {
        continue;
      } else if(points[0] === undefined) {
        beats.push(points[1].value);
      } else {
        let lineDelta = points[1].value - points[0].value;
        let lineLength = points[1].time - points[0].time;
        let beatDelta = lineDelta / lineLength;
        beats.push(points[0].value + (i-points[0].time) * beatDelta);
      }
    }

    this.beats = beats;
  }

  valueAtBeat(beat) {
    return this.beats[beat-1];
  }

  _getPointsForBeat(beat) {
    for(let i=0; i<this.abletonAutomationData.points.length; i++) {
      let automationPoint = this.abletonAutomationData.points[i];

      if(automationPoint.time >= beat) {
        return [this.abletonAutomationData.points[i-1], automationPoint];
      }
    }
  }

  _transformAutomationData(abletonAutomationData) {
    let transformedData = {
      points: [],
      lastBeat: Math.ceil(abletonAutomationData.automation[abletonAutomationData.automation.length-1].Time) + 1
    }

    let range = abletonAutomationData.max - abletonAutomationData.min;

    abletonAutomationData.automation.forEach((point) => {
      let value = parseFloat(point.Value);
      value = (value / range) + abletonAutomationData.min;

      transformedData.points.push({
        time: parseFloat(point.Time),
        value
      })
    });

    return transformedData;
  }

}
