import * as React from "react";
import { inject, observer } from "mobx-react";
//import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
//import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import {
	ITrimConnector,
	//ITrimMainObject,
	//IRecordType,
	//	ISearchResults,
} from "../../trim-coms/trim-connector";
//import BaseObjectTypes from "../../trim-coms/trim-baseobjecttypes";
//import TrimObjectPicker from "../TrimObjectPicker/TrimObjectPicker";
import PropertySheet from "../PropertySheet";
//import { BaseObjectTypes } from "../../trim-coms/trim-baseobjecttypes";

export class Samples extends React.Component<
	{
		appStore?: any;
		trimConnector?: ITrimConnector;
		className?: string;
	},
	any
> {
	private _onPropertySheetChange = (newProps: any) => {
		console.log(newProps);
	};
	/*
	private _onSelectObject = (propName: string) => (
		trimObject: ITrimMainObject
	) => {
		console.log(`${propName} == ${trimObject.Uri}`);
	};
*/
	public render() {
		//const { appStore } = this.props;
		const fd = {
			Version: "1",
			SupportsElectronicDocs: true,
			TitlingMethod: "FreeText",
			Pages: [
				{
					Type: "Normal",
					Caption: "General",
					CaptionsAbove: false,
					HighlightMandatory: false,
					Mandatory: false,
					NotesStyle: 2,
					PageItems: [
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemProperty, HP.HPTRIM.ServiceAPI.Model",
							EnumName: "Unknown",
							Format: "String",
							Name: "RecordTypedTitle",
							Caption: "Title (Free Text Part)",
							FullWidth: true,
							Mandatory: true,
							MandatoryTime: false,
							Value: "",
							ObjectType: "Unknown",
							CharacterLimit: 254,
							UserCharacterLimit: 0,
							Height: 5,
							MultiLine: true,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Property",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItem, HP.HPTRIM.ServiceAPI.Model",
							Type: "Line",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemProperty, HP.HPTRIM.ServiceAPI.Model",
							EnumName: "Unknown",
							Format: "String",
							Name: "RecordExternalReference",
							Caption: "External ID",
							FullWidth: true,
							Mandatory: false,
							MandatoryTime: false,
							Value: "",
							ObjectType: "Unknown",
							CharacterLimit: 50,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Property",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemProperty, HP.HPTRIM.ServiceAPI.Model",
							EnumName: "Unknown",
							Format: "Datetime",
							Name: "RecordDateCreated",
							Caption: "Date Created",
							FullWidth: true,
							Mandatory: true,
							MandatoryTime: false,
							Value: {
								__type:
									"HP.HPTRIM.ServiceModel.TrimDateTime, HP.HPTRIM.ServiceAPI.Model",
								IsClear: false,
								IsTimeClear: false,
								DateTime: "2019-03-14T13:52:21.0000000+11:00",
								StringValue: "14/03/2019 1:52 PM",
							},
							ObjectType: "Unknown",
							CharacterLimit: 0,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Property",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemProperty, HP.HPTRIM.ServiceAPI.Model",
							EnumName: "Unknown",
							Format: "Datetime",
							Name: "RecordDateDue",
							Caption: "Date Due",
							FullWidth: true,
							Mandatory: false,
							MandatoryTime: false,
							Value: {
								__type:
									"HP.HPTRIM.ServiceModel.TrimDateTime, HP.HPTRIM.ServiceAPI.Model",
								IsClear: true,
								IsTimeClear: true,
								DateTime: "0001-01-01T00:00:00.0000000+11:00",
								StringValue: "",
							},
							ObjectType: "Unknown",
							CharacterLimit: 0,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Property",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemProperty, HP.HPTRIM.ServiceAPI.Model",
							EnumName: "Unknown",
							Format: "Object",
							Name: "RecordAuthor",
							Caption: "Author",
							FullWidth: true,
							Mandatory: false,
							MandatoryTime: false,
							Value: {
								__type:
									"HP.HPTRIM.ServiceModel.Location, HP.HPTRIM.ServiceAPI.Model",
								TrimType: "Location",
								Uri: 0,
							},
							ObjectType: "Location",
							CharacterLimit: 0,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: 1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Property",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemProperty, HP.HPTRIM.ServiceAPI.Model",
							EnumName: "Unknown",
							Format: "Object",
							Name: "RecordContainer",
							Caption: "Container",
							FullWidth: true,
							Mandatory: false,
							MandatoryTime: false,
							ObjectType: "Record",
							CharacterLimit: 0,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: 1,
							EditPurposeExtra: 9000000000,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Property",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemProperty, HP.HPTRIM.ServiceAPI.Model",
							EnumName: "Unknown",
							Format: "Boolean",
							Name: "RecordIsEnclosed",
							Caption: "Enclosed?",
							FullWidth: true,
							Mandatory: false,
							MandatoryTime: false,
							Value: false,
							ObjectType: "Unknown",
							CharacterLimit: 0,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Property",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemProperty, HP.HPTRIM.ServiceAPI.Model",
							EnumName: "Unknown",
							Format: "Object",
							Name: "RecordAssignee",
							Caption: "Assignee",
							FullWidth: true,
							Mandatory: true,
							MandatoryTime: false,
							Value: {
								__type:
									"HP.HPTRIM.ServiceModel.Location, HP.HPTRIM.ServiceAPI.Model",
								TrimType: "Location",
								Icon: {
									IsFileTypeIcon: false,
									IsInternalIcon: true,
									IsValid: true,
									FileType: "",
									Id: "LocOrg",
								},
								NameString: "Europe",
								ToolTip: "Europe",
								Uri: 9000000056,
							},
							ObjectType: "Location",
							CharacterLimit: 0,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: 0,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Property",
						},
					],
					ChildType: "Unknown",
				},
				{
					Type: "Normal",
					Caption: "Extra",
					CaptionsAbove: false,
					HighlightMandatory: false,
					Mandatory: false,
					NotesStyle: 2,
					PageItems: [
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000000,
							LookupSetUri: 9000000000,
							LookupSetName: "Road Surfaces",
							LookupValues: ["Bitumen", "Blue Metal", "Concrete", "Dirt"],
							Format: "String",
							Name: "RoadSurface",
							Caption: "Road Surface",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: "Concrete",
							ObjectType: "Unknown",
							CharacterLimit: 400,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000001,
							LookupSetUri: 0,
							Format: "Boolean",
							Name: "Cautioned",
							Caption: "Cautioned",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: true,
							ObjectType: "Unknown",
							CharacterLimit: 3,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000007,
							LookupSetUri: 0,
							Format: "Number",
							Name: "Speed",
							Caption: "Speed",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: 0,
							ObjectType: "Unknown",
							CharacterLimit: 13,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000003,
							LookupSetUri: 0,
							Format: "Date",
							Name: "DateOfBirth",
							Caption: "Date of Birth",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: {
								__type:
									"HP.HPTRIM.ServiceModel.TrimDateTime, HP.HPTRIM.ServiceAPI.Model",
								IsClear: true,
								IsTimeClear: true,
								DateTime: "0001-01-01T00:00:00.0000000+11:00",
								StringValue: "",
							},
							ObjectType: "Unknown",
							CharacterLimit: 30,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000004,
							LookupSetUri: 0,
							Format: "Datetime",
							Name: "DateOfIssue",
							Caption: "Date of Issue",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: {
								__type:
									"HP.HPTRIM.ServiceModel.TrimDateTime, HP.HPTRIM.ServiceAPI.Model",
								IsClear: false,
								IsTimeClear: false,
								DateTime: "2018-12-14T15:37:06.0000000+11:00",
								StringValue: "",
							},
							ObjectType: "Unknown",
							CharacterLimit: 40,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000006,
							LookupSetUri: 0,
							Format: "Decimal",
							Name: "AlcoholLevel",
							Caption: "Alcohol Level",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: 0,
							ObjectType: "Unknown",
							CharacterLimit: 100,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000008,
							LookupSetUri: 0,
							Format: "Text",
							Name: "PlaceOfInfringement",
							Caption: "Place of Infringement",
							FullWidth: true,
							Mandatory: false,
							MandatoryTime: false,
							Value: "",
							ObjectType: "Unknown",
							CharacterLimit: 65536,
							UserCharacterLimit: 10000,
							Height: 5,
							MultiLine: true,
							DefaultYes: false,
							Readonly: true,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000002,
							LookupSetUri: 0,
							Format: "Currency",
							Name: "AmountPaid",
							Caption: "Amount Paid",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: 0,
							CurrencySymbol: "",
							ObjectType: "Unknown",
							CharacterLimit: 100,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000009,
							LookupSetUri: 9000000004,
							LookupSetName: "Vehicle Makes and Models",
							LookupValues: [
								"Holden",
								"Honda",
								"Hyundai",
								"Skoda",
								"Honda - Civic",
								"Holden - Commodore",
								"Skoda - Octavia",
								"Hyundai - Accent",
								"Hyundai - Sonata",
							],
							Format: "String",
							Name: "VehicleMakeAndModel",
							Caption: "Vehicle Make and Model",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: "",
							ObjectType: "Unknown",
							CharacterLimit: 400,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000010,
							LookupSetUri: 9000000003,
							LookupSetName: "Vehicle Shapes",
							LookupValues: [
								"Hatch",
								"Sedan",
								"SUV/4WD",
								"Truck",
								"Utility",
								"Wagon",
							],
							Format: "String",
							Name: "VehicleShape",
							Caption: "Vehicle Shape",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: "",
							ObjectType: "Unknown",
							CharacterLimit: 400,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000011,
							LookupSetUri: 9000000001,
							LookupSetName: "Visibility",
							LookupValues: [
								"Fair",
								"High",
								"Low",
								"Low - Fog",
								"Low - Night",
								"Fair - Dusk",
								"Fair - Fog",
								"Fair - Overcast",
							],
							Format: "Object",
							Name: "Visibility",
							Caption: "Visibility",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: {
								__type:
									"HP.HPTRIM.ServiceModel.LookupItem, HP.HPTRIM.ServiceAPI.Model",
								TrimType: "LookupItem",
								Icon: {
									IsFileTypeIcon: false,
									IsInternalIcon: true,
									IsValid: true,
									FileType: "",
									Id: "BobLookupSetItem",
								},
								NameString: "High",
								ToolTip: "High",
								Uri: 9000000011,
							},
							ObjectType: "LookupItem",
							CharacterLimit: 0,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: 1,
							EditPurposeExtra: 9000000001,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000012,
							LookupSetUri: 9000000002,
							LookupSetName: "Vehicle Load Categories",
							LookupValues: ["3000: Heavy", "1400: Light", "2000: Medium"],
							Format: "Object",
							Name: "MaximumLoad",
							Caption: "Maximum Load",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: {
								__type:
									"HP.HPTRIM.ServiceModel.LookupItem, HP.HPTRIM.ServiceAPI.Model",
								TrimType: "LookupItem",
								Icon: {
									IsFileTypeIcon: false,
									IsInternalIcon: true,
									IsValid: true,
									FileType: "",
									Id: "BobLookupSetItem",
								},
								NameString: "2000: Medium",
								ToolTip: "2000: Medium",
								Uri: 9000000013,
							},
							ObjectType: "LookupItem",
							CharacterLimit: 0,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: 1,
							EditPurposeExtra: 9000000002,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000013,
							LookupSetUri: 0,
							Format: "Object",
							Name: "PoliceOfficer",
							Caption: "Police Officer",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							ObjectType: "Location",
							CharacterLimit: 0,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: 61,
							EditPurposeExtra: 9000000013,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
						{
							__type:
								"HP.HPTRIM.ServiceModel.PageItemField, HP.HPTRIM.ServiceAPI.Model",
							Uri: 9000000014,
							LookupSetUri: 0,
							Format: "Geography",
							Name: "MapReference",
							Caption: "Map Reference",
							FullWidth: false,
							Mandatory: false,
							MandatoryTime: false,
							Value: "",
							ObjectType: "Unknown",
							CharacterLimit: 0,
							UserCharacterLimit: 0,
							Height: 0,
							MultiLine: false,
							DefaultYes: false,
							Readonly: false,
							EditPurpose: -1,
							EditPurposeExtra: 0,
							SearchStartingPoint: 0,
							WarnWhenBlank: false,
							Type: "Field",
						},
					],
					ChildType: "Unknown",
				},
			],
		};
		return (
			<div>
				<h1>Samples</h1>

				<PropertySheet
					formDefinition={fd}
					onChange={this._onPropertySheetChange}
				/>
				{/* <TrimObjectPicker
					trimType={BaseObjectTypes.Record}
					propertyName="test"
					onTrimObjectSelected={this._onSelectObject("test")}
				/> */}
			</div>
		);
	}
}

export default inject("appStore", "trimConnector")(observer(Samples));
