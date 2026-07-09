"""
Brisvora Flask API — Python Microservice
Serves mock property data, health checks, and future async webhook processing.

Endpoints:
  GET  /health                    → { status: "ok", version: "1.0.0" }
  GET  /api/mock/{type}/{bhk}     → Mock property JSON (e.g. /api/mock/apartment/2bhk)

Run: python app.py
"""

import os
import json
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

# ── Route: Health Check ──────────────────────────────────────────────
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'version': '1.0.0',
        'service': 'brisvora-flask-api'
    })


# ── Route: Mock Data ─────────────────────────────────────────────────
VALID_TYPES = {
    'apartment': ['1bhk', '2bhk', '3bhk'],
    'villa': [''],
    'plot': [''],
    'commercial': [''],
}


@app.route('/api/mock/<property_type>/<bhk>', methods=['GET'])
def get_mock_data(property_type, bhk):
    """Return mock property JSON for given type and BHK combination."""
    filename = f'{property_type}_{bhk}.json' if bhk else f'{property_type}.json'
    filepath = os.path.join(DATA_DIR, filename)

    if not os.path.exists(filepath):
        return jsonify({
            'error': f'Mock data not found for {property_type}/{bhk}',
            'available': VALID_TYPES
        }), 404

    with open(filepath, 'r') as f:
        data = json.load(f)

    return jsonify(data)


# ── Route: Mock Type List ────────────────────────────────────────────
@app.route('/api/mock', methods=['GET'])
def list_mock_types():
    """List all available mock data types."""
    types = {}
    for pt, bhks in VALID_TYPES.items():
        types[pt] = [f'/api/mock/{pt}/{b}' if b else f'/api/mock/{pt}' for b in bhks]
    return jsonify({'available_mocks': types})


# ── Error Handlers ────────────────────────────────────────────────────
@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Not found'}), 404


@app.errorhandler(500)
def internal_error(e):
    return jsonify({'error': 'Internal server error'}), 500


# ── Entry Point ───────────────────────────────────────────────────────
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)