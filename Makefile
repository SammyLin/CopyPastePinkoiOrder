default:
	cp -r src tmp_src
	cp build/CopyPastePinkoiOrder.pem tmp_src/key.pem
	mkdir -p pkg
	# echo $$(cat tmp_src/manifest.json | jq '.version' -r)
	zip -r "pkg/v$$(cat tmp_src/manifest.json | jq '.version' -r)-CopyPastePinkoiOrder.zip" tmp_src
	rm -rf tmp_src
