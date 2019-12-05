(global as any).config = { BASE_URL: "" };

import * as React from "react";
import { mount, shallow } from "enzyme";
import { NewRecord } from "./NewRecord";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { TrimConnector } from "../trim-coms/trim-connector";
import { IRecordType, ITrimMainObject } from "../trim-coms/trim-connector";
import PropertySheet from "./PropertySheet";
import { IOfficeConnector } from "../office-coms/office-connector";
import BaseObjectTypes from "../trim-coms/trim-baseobjecttypes";

describe("New Record layout", function() {
	let resolveRecordTypes;
	let testRecordUrn = "";
	let testSubjectPrefix = "";
	let propertySheetTrimType = BaseObjectTypes.Location;
	let wrapper;
	let registerProps = {};
	let registerType = BaseObjectTypes.CheckinPlace;

	const makeWrapper = (trimType: BaseObjectTypes, onCreated?: any) => {
		const innerWrapper = shallow<NewRecord>(
			<NewRecord
				appStore={mockStore}
				trimConnector={mockTrimConnector}
				wordConnector={new MockWordConnector()}
				trimType={trimType}
				onTrimObjectCreated={onCreated}
			/>
		);
		innerWrapper.setState({ formDefinition: { Pages: [] } });

		return innerWrapper;
	};

	beforeEach(() => {
		testRecordUrn = "";
		testSubjectPrefix = "";
		propertySheetTrimType = BaseObjectTypes.Location;
		registerProps = {};
		registerType = BaseObjectTypes.CheckinPlace;

		wrapper = makeWrapper(BaseObjectTypes.Record);
	});

	let mockTrimConnector = new TrimConnector();

	mockTrimConnector.registerInTrim = (
		trimType: BaseObjectTypes,
		properties: any,
		fields: any
	) => {
		registerProps = properties;
		registerType = trimType;
		return new Promise<ITrimMainObject>(function(resolve) {
			resolve({ Uri: 456 });
		});
	};

	mockTrimConnector.search = () => {
		return new Promise(function(resolve) {
			resolveRecordTypes = resolve;
		});
	};

	mockTrimConnector.getPropertySheet = (trimType: BaseObjectTypes) => {
		propertySheetTrimType = trimType;
		return new Promise(function(resolve) {
			resolve({ PageItems: [] });
		});
	};

	mockTrimConnector.getDatabaseProperties = () => {
		return new Promise(function(resolve) {
			resolve({
				EmailSubjectPrefix: "CM:",
				CurrencySymbol: "",
			});
		});
	};

	const mockStore = {
		RecordUri: 0,
		RecordProps: {},
		messages: {
			web_Register: "Register",
			web_SelectRecordType: "Select a Record Type",
		},
		documentInfo: { Options: {}, URN: "test_urn" },
		createRecord: (recordUri, recordProps) => {
			mockStore.RecordUri = recordUri;
			mockStore.RecordProps = recordProps;

			return new Promise(function(resolve) {
				resolve();
			});
		},
		FileName: "default title",
	};

	class MockWordConnector implements IOfficeConnector {
		insertLink(textToInsert: string, url: string): void {
			throw new Error("Method not implemented.");
		}
		saveDocument(): Promise<void> {
			throw new Error("Method not implemented.");
		}
		getDocumentData(writeSlice: any): Promise<string> {
			throw new Error("Method not implemented.");
		}
		setAutoOpen(
			autoOpen: boolean,
			recordUrn: string,
			subjectPrefix: string
		): void {
			testRecordUrn = recordUrn;
			testSubjectPrefix = subjectPrefix;
		}
		getAutoOpen(): boolean {
			throw new Error("Method not implemented.");
		}
		insertText(textToInsert: string): void {
			throw new Error("Method not implemented.");
		}
		getAccessToken(): Promise<string> {
			throw new Error("Method not implemented.");
		}
		setUri(
			uri: number
		): Promise<import("../office-coms/word-connector").IGetRecordUriResponse> {
			throw new Error("Method not implemented.");
		}
		getWebUrl(): Promise<string> {
			throw new Error("Method not implemented.");
		}
		getUri(): Promise<
			import("../office-coms/word-connector").IGetRecordUriResponse
		> {
			throw new Error("Method not implemented.");
		}
	}

	it("contains a Record Type dropdown", async (done) => {
		resolveRecordTypes({
			results: [{ Uri: 1, NameString: "Document" } as IRecordType],
		});

		expect(wrapper.find(Dropdown).exists()).toBeTruthy();
		expect(wrapper.find(Dropdown).props().placeholder).toEqual(
			"Select a Record Type"
		);
		setImmediate(() => {
			expect(
				wrapper
					.update()
					.find(Dropdown)
					.props().options
			).toEqual([{ key: 1, text: "Document" }]);
			done();
		});
	});

	it("contains a button", () => {
		expect(wrapper.find(PrimaryButton).exists()).toBeTruthy();
		expect(
			wrapper
				.find(PrimaryButton)
				.childAt(0)
				.text()
		).toMatch("Register");
	});

	it("Sets the Record Type Uri from on load and onChange", () => {
		const instance = wrapper.instance();
		instance.setRecordTypes([]);

		expect(instance.recordTypeUri).toEqual(0);

		// should be zero after the record types list has been changed
		instance.setRecordTypes([
			{ key: 1, text: "Document" },
			{ key: 5, text: "Document 5" },
		]);
		wrapper
			.update()
			.find(Dropdown)
			.props()
			.onChange(null, null, 1);

		instance.setRecordTypes([{ key: 1, text: "Document" }]);

		expect(instance.recordTypeUri).toEqual(0);

		wrapper
			.update()
			.find(Dropdown)
			.props()
			.onChange(null, null, 0);

		expect(instance.recordTypeUri).toEqual(1);
	});

	it("calls create record on button press", () => {
		const instance = wrapper.instance();
		instance.setRecordTypes([
			{ key: 1, text: "Document" },
			{ key: 5, text: "Document 5" },
		]);

		wrapper
			.update()
			.find(Dropdown)
			.props()
			.onChange(null, null, 0);

		wrapper
			.update()
			.find(PrimaryButton)
			.props()
			.onClick(null);

		expect(mockStore.RecordUri).toEqual(1);
	});

	it("calls register in TRIM for non Record object", () => {
		const wrapper = makeWrapper(BaseObjectTypes.CheckinStyle);
		const instance = wrapper.instance();
		instance.setRecordTypes([
			{ key: 1, text: "Document" },
			{ key: 5, text: "Document 5" },
		]);

		wrapper
			.update()
			.find(Dropdown)
			.props()
			.onChange(null, null, 1);

		wrapper
			.update()
			.find(PrimaryButton)
			.props()
			.onClick(null);

		expect(registerType).toEqual(BaseObjectTypes.CheckinStyle);
		expect(registerProps).toEqual({ CheckinStyleRecordType: 5 });
	});

	it("calls on created event", (done) => {
		let eventCalled = false;

		const wrapper = makeWrapper(BaseObjectTypes.CheckinStyle, () => {
			eventCalled = true;
		});
		const instance = wrapper.instance();
		instance.setRecordTypes([
			{ key: 1, text: "Document" },
			{ key: 5, text: "Document 5" },
		]);

		wrapper
			.update()
			.find(Dropdown)
			.props()
			.onChange(null, null, 1);

		wrapper
			.update()
			.find(PrimaryButton)
			.props()
			.onClick(null);

		setTimeout(() => {
			try {
				expect(eventCalled).toBeTruthy();
			} catch (e) {
				done.fail(e);
			}
			done();
		});
	});

	it("sends computed fields to Checkin Style", () => {
		const wrapper = makeWrapper(BaseObjectTypes.CheckinStyle);
		const instance = wrapper.instance();
		instance.setRecordTypes([
			{ key: 1, text: "Document" },
			{ key: 5, text: "Document 5" },
		]);

		wrapper
			.update()
			.find(Dropdown)
			.props()
			.onChange(null, null, 0);

		const propertySheet = wrapper.find(PropertySheet);
		expect(propertySheet.props().computedProperties).toEqual([
			{
				Name: "CheckinStyleUseForServerMailCapture",
				Value: true,
				Type: "Property",
			},
			{
				Name: "CheckinStyleUseForServerMailFolderType",
				Value: "NormalFolder",
				Type: "Property",
			},
			{ Name: "CheckinStyleRecordType", Value: undefined, Type: "Property" },
		]);
	});

	it("sends the default on click even if no fields on the form have been modified", () => {
		const instance = wrapper.instance();
		instance.setRecordTypes([
			{ key: 1, text: "Document" },
			{ key: 5, text: "Document 5" },
		]);

		wrapper
			.update()
			.find(PrimaryButton)
			.props()
			.onClick(null);

		expect(mockStore.RecordProps).toEqual({
			RecordTypedTitle: "default title",
		});
	});

	it("sends updated properties button press", () => {
		const instance = wrapper.instance();
		instance.setRecordTypes([
			{ key: 1, text: "Document" },
			{ key: 5, text: "Document 5" },
		]);

		// wrapper
		//   .update()
		//   .find(Dropdown)
		//   .props()
		//   .onChange(null, null, 0);

		wrapper
			.update()
			.find(PropertySheet)
			.props()
			.onChange({ RecordTypedTitle: "test title" });

		wrapper
			.update()
			.find(PrimaryButton)
			.props()
			.onClick(null);

		expect(mockStore.RecordProps).toEqual({ RecordTypedTitle: "test title" });
	});

	it("sends record URN to auto open", (done) => {
		const instance = wrapper.instance();
		instance.setRecordTypes([
			{ key: 1, text: "Document" },
			{ key: 5, text: "Document 5" },
		]);

		wrapper
			.update()
			.find(PrimaryButton)
			.props()
			.onClick(null);

		setTimeout(() => {
			try {
				expect(testRecordUrn).toEqual("test_urn");
				done();
			} catch (e) {
				done.fail(e);
			}
		});
	});

	it("sends the email prefix", (done) => {
		const instance = wrapper.instance();

		instance.setRecordTypes([
			{ key: 1, text: "Document" },
			{ key: 5, text: "Document 5" },
		]);

		wrapper
			.update()
			.find(PrimaryButton)
			.props()
			.onClick(null);

		setTimeout(() => {
			try {
				expect(testSubjectPrefix).toEqual("CM:");
				done();
			} catch (e) {
				done.fail(e);
			}
		});
	});

	it("displays a property sheet when Record Type is set", (done) => {
		const shallowWrapper = shallow<NewRecord>(
			<NewRecord
				appStore={mockStore}
				trimConnector={mockTrimConnector}
				wordConnector={new MockWordConnector()}
				trimType={BaseObjectTypes.Record}
			/>
		);

		const instance = shallowWrapper.instance();
		instance.setRecordTypes([
			{ key: 1, text: "test" },
			{ key: 2, text: "test" },
		]);
		// no property sheet before recordtype uri sey
		expect(shallowWrapper.find(PropertySheet).exists()).toBeTruthy();

		shallowWrapper
			.find(Dropdown)
			.props()
			.onChange(null, null, 1);

		setImmediate(() => {
			try {
				// 	//expect(wrapper.find(PropertySheet).exists()).toBeTruthy();
				expect(shallowWrapper.state().formDefinition).toEqual({
					PageItems: [],
				});
				expect(
					shallowWrapper.find(PropertySheet).props().formDefinition
				).toEqual({
					PageItems: [],
				});
				done();
			} catch (e) {
				done.fail(e);
			}
		});
	});
	it("sends the correct trimType to getPropertysheet", (done) => {
		const shallowWrapper = shallow<NewRecord>(
			<NewRecord
				appStore={mockStore}
				trimConnector={mockTrimConnector}
				wordConnector={new MockWordConnector()}
				trimType={BaseObjectTypes.CheckinStyle}
			/>
		);

		const instance = shallowWrapper.instance();
		instance.setRecordTypes([
			{ key: 1, text: "test" },
			{ key: 2, text: "test" },
		]);

		shallowWrapper
			.find(Dropdown)
			.props()
			.onChange(null, null, 1);

		setImmediate(() => {
			try {
				expect(propertySheetTrimType).toEqual(BaseObjectTypes.CheckinStyle);

				done();
			} catch (e) {
				done.fail(e);
			}
		});
	});
});
